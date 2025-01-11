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
import {Crepe} from "@milkdown/crepe";
import {xcodeDark} from "@uiw/codemirror-theme-xcode";
import {flatPlugins, isZoneAwarePromise} from "./utils/ng-milkdown-plugin-utils";

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
    ]
})
export class NgMilkdown extends NgProsemirrorEditor implements ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() loading = true;
  @Output() loadingChange = new EventEmitter<boolean>();
  editor: Editor = undefined;
  constructor(public override el: ElementRef) {
    super(el);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.config || changes.plugins || changes.editor) {
      await this.render();
    }
  }

  @Input() classList: string[] = [];

  @Input() spinner: TemplateRef<any> = null;

  crepe: Crepe;

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
  onTouched: () => void = () => {
  };

  onChange: (value: any) => void = (value) => {
    this.onChanged.emit(value)
  };

  @ViewChild('editorRef') editorRef: ElementRef;
  disabled = false;

  async render(): Promise<void> {
    this.loading = true;
    if (this.value) {
      setTimeout(async () => {
        this.crepe = new Crepe({
          root: this.el.nativeElement,
          defaultValue: this.value,
          featureConfigs: {
            [Crepe.Feature.CodeMirror]: {
              theme: xcodeDark
            }
          },
        });
        let editor = await this.crepe.create();
        editor
          .use(listener)
          .config(async (ctx) => {
            const listener = ctx.get(listenerCtx);
            listener.markdownUpdated((_, md) => {
              this.value = md;
              this.onChange(md);
            });

            if (isZoneAwarePromise(this.config)) {
              await this.config(ctx, this.provider);
            } else {
              this.config(ctx, this.provider);
            }
          });
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
        this.loading = false;
        this.loadingChange.emit(false);
        this.onReady.emit(editor);
        this.editor = editor;
      })
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.render();
  }
}
