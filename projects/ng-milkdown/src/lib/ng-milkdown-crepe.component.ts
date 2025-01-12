import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, NgZone,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Editor} from "@milkdown/core";
import {NgTemplateOutlet} from "@angular/common";
import {StringTemplateOutletDirective} from "./directive/string-template-outlet.directive";
import {
  NgMilkdownPlugin,
} from "./ng-milkdown.type";
import {NgProsemirrorEditor} from "ng-prosemirror-adapter";
import {Crepe, CrepeFeature} from "@milkdown/crepe";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {getPlugins} from "./utils/ng-milkdown-plugin-utils";

@Component({
  selector: 'ng-milkdown-crepe',
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
      useExisting: forwardRef(() => NgMilkdownCrepe),
      multi: true
    },
    {
      provide: NgProsemirrorEditor,
      useExisting: forwardRef(() => NgMilkdownCrepe)
    },
  ]
})
export class NgMilkdownCrepe extends NgProsemirrorEditor implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {
  constructor(public override el: ElementRef, private ngZone: NgZone) {
    super(el);
    this.beforeReady.subscribe(crepe=>{
      crepe.editor.config(async (ctx) => {
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

  @Input() classList: string[] = []

  @Input() loading: boolean = true;

  @Output() loadingChange = new EventEmitter<boolean>();

  @Input() spinner: TemplateRef<any> = null;

  crepe: Crepe;

  @Input() features: Partial<Record<CrepeFeature, boolean>> = null
  @Input() featureConfigs: CrepeFeatureConfig = null

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

  defaultPlugins: NgMilkdownPlugin[] = [listener];
  @Input() plugins: NgMilkdownPlugin[] = [];
  @Output() beforeReady = new EventEmitter<Crepe>();
  @Output() onReady = new EventEmitter<Crepe>();

  get editor(): Editor {
    return this.crepe.editor
  }

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
      const crepe = new Crepe({
        root: this.editorRef.nativeElement,
        defaultValue: this.value,
        features: this.features || {},
        featureConfigs: this.featureConfigs || {},
      });
      setTimeout(async () => {
        crepe.editor.use([
          ...getPlugins(this.defaultPlugins, this.provider),
          ...getPlugins(this.plugins, this.provider)]
        );
        this.beforeReady.emit(crepe);
      });
      await this.ngZone.run(async () => {
        this.crepe = crepe;
        await crepe.create();
        this.loading = false;
        this.loadingChange.emit(false);
        this.onReady.emit(crepe);
      });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.render();
  }

  async ngOnDestroy(): Promise<void> {
    await this.crepe.destroy();
  }
}
