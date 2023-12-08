// noinspection TypeScriptValidateTypes

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {defaultValueCtx, Editor, rootCtx} from "@milkdown/core";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {nord} from "@milkdown/theme-nord";
import {commonmark} from "@milkdown/preset-commonmark";
import {NgMilkdownService} from "./ng-milkdown.service";
import {NgTemplateOutlet} from "@angular/common";
import {StringTemplateOutletDirective} from "./directive/string-template-outlet.directive";
import {
  NgMilkdownEditorConfig,
  NgMilkdownPlugin,
  NgMilkdownPluginConfig,
} from "./ng-milkdown.type";
import {NgProsemirrorEditor} from "../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-editor.component";


function isZoneAwarePromise(object: any) {
  return object instanceof Promise;
}

@Component({
  selector: 'ng-milkdown',
  standalone: true,
  template: `
      <div #editorRef class="milkdown-editor"></div>
      @if (loading && spinner) {
          <ng-container *stringTemplateOutlet="spinner"></ng-container>
      }
      <ng-template #spinner>
          <div class="milkdown-spinner">
              <div class="spinner">
                  <div class="spinner-text">loading...</div>
                  <div class="spinner-dot"></div>
              </div>
          </div>
      </ng-template>
  `,
  styles: [
    `
      @import "tailwindcss/base";
      @import "tailwindcss/components";
      @import "tailwindcss/utilities";

      :host {
        display: contents;
      }

      .milkdown-spinner {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .spinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .spinner-text {
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }

      .spinner-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #333;
        animation: loading 1s infinite;
        margin-left: -100px;
      }

      @keyframes loading {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(100px);
        }
        100% {
          transform: translateX(0);
        }
      }
    `
  ],
  imports: [
    NgTemplateOutlet, StringTemplateOutletDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgMilkdown),
      multi: true
    },
    {
      provide: NgProsemirrorEditor,
      useExisting: forwardRef(() => NgMilkdown)
    },
    NgMilkdownService
  ]
})
export class NgMilkdown extends NgProsemirrorEditor implements ControlValueAccessor, AfterViewInit {
  constructor(public override el: ElementRef, protected ngMilkdownService: NgMilkdownService) {
    super(el);
  }

  @Input() classList: string[] = [];

  get loading() {
    return this.ngMilkdownService.loading
  }

  @Input() set loading(value) {
    this.ngMilkdownService.loading = value
  }

  @ViewChild('spinner') _defaultSpinner: TemplateRef<any>;
  _spinner: TemplateRef<any> = null;

  get spinner(): TemplateRef<any> {
    return this._spinner || this._defaultSpinner;
  }

  @Input() set spinner(value) {
    this._spinner = value;
  }

  get editor() {
    return this.ngMilkdownService.editor
  }

  set editor(value) {
    this.ngMilkdownService.editor = value
  }

  _userEditor: (element: HTMLElement) => Promise<Editor> = null;

  @Input() set userEditor(value: (element: HTMLElement) => Promise<Editor>) {
    this._userEditor = value;
  }

  get userEditor() {
    return this._userEditor;
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = value;
      if (this.editor)
        this.editor.config(async (ctx: Ctx) => {
          ctx.set(defaultValueCtx, value);
        })
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @Input() value: string = null;
  @Output() onChanged = new EventEmitter<string>();

  @Input() plugins: NgMilkdownPlugin[] = [];
  @Input() editorConfig: NgMilkdownEditorConfig = (ctx, provider) => null;
  @Output() onReady = new EventEmitter<Editor>();
  onTouched: () => void = () => {
  };


  onChange: (value: any) => void = (value) => {
    this.onChanged.emit(value)
  };

  @ViewChild('editorRef') editorRef: ElementRef;
  disabled = false;

  async render(): Promise<void> {
    if (this.userEditor) {
      this.editor = await this.userEditor(this.editorRef.nativeElement);
      this.onReady.emit(this.editor);
      return;
    }

    setTimeout(async () => {
      let editor = Editor.make()
        .config(async (ctx) => {
          ctx.set(rootCtx, this.editorRef.nativeElement);
          ctx.set(defaultValueCtx, this.value);
          ctx.get(listenerCtx).markdownUpdated((_, md) => {
            this.value = md;
            this.onChange(md);
          });

          if (isZoneAwarePromise(this.editorConfig)) {
            await this.editorConfig(ctx, this.provider);
          } else {
            this.editorConfig(ctx, this.provider);
          }
        })
        .config(nord)
        .use(commonmark)
        .use(listener)

      for (const ngPlugin of this.plugins) {
        if ((ngPlugin as any).plugin && (ngPlugin as any).config) {
          const {plugin, config} = ngPlugin as unknown as {
            plugin: (MilkdownPlugin | MilkdownPlugin[]),
            config: NgMilkdownPluginConfig
          };
          editor = editor.use(plugin);
          const configFn = config(this.provider);
          if (isZoneAwarePromise(configFn)) {
            editor = editor.config((await configFn) as (ctx: Ctx) => void)
          } else {
            editor = editor.config(configFn as (ctx: Ctx) => void)
          }
        } else {
          editor = editor.use(ngPlugin as (MilkdownPlugin | MilkdownPlugin[]));
        }
      }

      editor = await editor.create();
      this.loading = false;
      this.onReady.emit(editor);
      this.editor = editor;
    })
  }

  async ngAfterViewInit(): Promise<void> {
    await this.render();
  }
}