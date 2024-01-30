import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
  MilkdownPlugins,
  MilkdownPluginsConfigurable,
  NgMilkdownEditorConfig,
  NgMilkdownPlugin,
  NgMilkdownPluginFactory,
} from "./ng-milkdown.type";
import {NgProsemirrorEditor} from "ng-prosemirror-adapter";


function isZoneAwarePromise(object: any) {
  return object instanceof Promise;
}

function flatPlugins(plugins: MilkdownPlugins): (MilkdownPlugin | MilkdownPlugin[]) {
  let convertedPlugins: MilkdownPlugin | MilkdownPlugin[];
  if (Array.isArray(plugins)) {
    convertedPlugins = plugins.flat(1);
  } else {
    convertedPlugins = plugins;
  }
  return convertedPlugins;
}

@Component({
  selector: 'ng-milkdown',
  standalone: true,
  template: `
      <div #editorRef [hidden]="loading" class="milkdown-editor" [class]="classList"></div>
      @if (loading) {
          <ng-container *stringTemplateOutlet="spinner">loading...</ng-container>
      }
  `,
  styles: [
    `
      @import "tailwindcss/base";
      @import "tailwindcss/components";
      @import "tailwindcss/utilities";

      :host {
        display: contents;
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
export class NgMilkdown extends NgProsemirrorEditor implements ControlValueAccessor, AfterViewInit, OnChanges {
  constructor(public override el: ElementRef, protected ngMilkdownService: NgMilkdownService) {
    super(el);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.config || changes.plugins || changes.editor) {
      await this.render();
    }
  }

  @Input() classList: string[] = [];

  get loading() {
    return this.ngMilkdownService.loading
  }

  @Input() set loading(value) {
    this.ngMilkdownService.loading = value
  }
  @Output() loadingChange = new EventEmitter<boolean>();

  @Input() spinner: TemplateRef<any> = null;

  get editor(): Editor {
    return this.ngMilkdownService.editor;
  }

  _editorFn: (element: HTMLElement) => Promise<Editor> = null;

  @Input()
  set editor(editorFn: ((element: HTMLElement) => Promise<Editor>)) {
    this._editorFn = editorFn;
  }

  async writeValue(value: any): Promise<void> {
    if (value !== undefined && value !== null) {
      this.value = value;
      await this.render();
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
  @Input() config: NgMilkdownEditorConfig = (ctx, provider) => null;
  @Output() onReady = new EventEmitter<Editor>();
  onTouched: () => void = () => {};

  onChange: (value: any) => void = (value) => {
    this.onChanged.emit(value)
  };

  @ViewChild('editorRef') editorRef: ElementRef;
  disabled = false;

  async render(): Promise<void> {
    this.loading = true;
    if (this._editorFn) {
      this.ngMilkdownService.editor = await this._editorFn(this.editorRef.nativeElement);
      this.onReady.emit(this.editor);
      this.loading = false;
      this.loadingChange.emit(false);
      return;
    }

    if(this.value) {
      setTimeout(async () => {
        let editor = Editor.make()
          .config(async (ctx) => {
            ctx.set(rootCtx, this.editorRef.nativeElement);
            ctx.set(defaultValueCtx, this.value);
            ctx.get(listenerCtx).markdownUpdated((_, md) => {
              this.value = md;
              this.onChange(md);
            });

            if (isZoneAwarePromise(this.config)) {
              await this.config(ctx, this.provider);
            } else {
              this.config(ctx, this.provider);
            }
          })
          .config(nord)
          .use(commonmark)
          .use(listener)

        for (const ngMilkdownPlugin of this.plugins) {
          if ((ngMilkdownPlugin as any).plugin && (ngMilkdownPlugin as any).config) {
            const {plugin, config} = ngMilkdownPlugin as unknown as MilkdownPluginsConfigurable;
            editor = editor.use(flatPlugins(plugin));
            if (isZoneAwarePromise(config)) {
              editor = editor.config((await config) as (ctx: Ctx) => void)
            } else {
              editor = editor.config(config as (ctx: Ctx) => void)
            }
          } else if ((ngMilkdownPlugin as any).factory) {
            editor = editor.use(flatPlugins((ngMilkdownPlugin as NgMilkdownPluginFactory).factory(this.provider)));
          } else {
            editor = editor.use(flatPlugins(ngMilkdownPlugin as (MilkdownPlugins)));
          }
        }

        editor = await editor.create();
        this.loading = false;
        this.loadingChange.emit(false);
        this.onReady.emit(editor);
        this.ngMilkdownService.editor = editor;
      })
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.render();
  }
}
