import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, NgZone,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {defaultValueCtx, Editor, rootCtx} from "@milkdown/core";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {commonmark} from "@milkdown/preset-commonmark";
import {NgTemplateOutlet} from "@angular/common";
import {StringTemplateOutletDirective} from "./directive/string-template-outlet.directive";
import {
  NgMilkdownEditor,
  NgMilkdownPlugin,
} from "./ng-milkdown.type";
import { NgProsemirrorEditor} from "ng-prosemirror-adapter";
import {getPlugins} from "./utils/ng-milkdown-plugin-utils";
import type {DefaultValue} from "@milkdown/kit/lib/core";

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
  constructor(public override el: ElementRef, private ngZone: NgZone) {
    super(el);
    this.beforeReady.subscribe(({editor}) => {
      editor.config(async (ctx) => {
        ctx.set(rootCtx, this.editorRef.nativeElement);
        ctx.set(defaultValueCtx, this.value);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            this.value = markdown;
            this.onChange(markdown);
          }
        });
      });
    })
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.config || changes.plugins || changes.editor) {
      await this.render();
    }
  }

  @Input() classList: string[] = [];

  @Input() loading = true;
  @Output() loadingChange = new EventEmitter<boolean>();

  @Input() spinner: TemplateRef<any> = null;

  editor: Editor;

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

  @Input() value: DefaultValue = null;
  @Output() onChanged = new EventEmitter<string>();

  @Input() plugins: NgMilkdownPlugin[] = [];
  @Output() beforeReady = new EventEmitter<NgMilkdownEditor>();
  @Output() onReady = new EventEmitter<NgMilkdownEditor>();
  onTouched: () => void = () => {
  };

  onChange: (value: any) => void = (value) => {
    this.onChanged.emit(value)
  };

  @ViewChild('editorRef') editorRef: ElementRef;
  disabled = false;
  defaultPlugins: NgMilkdownPlugin[] = [commonmark, listener];

  async render(): Promise<void> {
    this.loading = true;
    if (this.value) {
      let editor = Editor.make()
      setTimeout(async () => {
        editor.use([
          ...getPlugins(this.defaultPlugins, this.provider),
          ...getPlugins(this.plugins, this.provider)
        ]);
        this.beforeReady.emit({editor, provider: this.provider});
      });
      await this.ngZone.run(async () => {
        this.editor = editor;
        await editor.create();
        this.loading = false;
        this.loadingChange.emit(false);
        this.onReady.emit({editor, provider: this.provider});
      });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.render();
  }
}
