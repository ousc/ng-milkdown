import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Editor} from "@milkdown/core";
import {StringTemplateOutletDirective} from "./directive/string-template-outlet.directive";
import {
  NgMilkdownCrepeEditor,
  NgMilkdownPlugin,
} from "./ng-milkdown.type";
import {NgProsemirrorEditor} from "ng-prosemirror-adapter";
import {Crepe, CrepeFeature} from "@milkdown/crepe";
import {CrepeFeatureConfig} from "@milkdown/crepe/lib/types/feature";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {debounce, getPlugins} from "./utils/ng-milkdown-plugin-utils";
import type {DefaultValue} from "@milkdown/kit/lib/core";
import {throttle} from "rxjs";

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
    StringTemplateOutletDirective
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
export class NgMilkdownCrepe extends NgProsemirrorEditor implements ControlValueAccessor, AfterViewInit, OnDestroy {
  constructor(public override el: ElementRef, private ngZone: NgZone) {
    super(el);
    this.beforeReady.subscribe(({crepe}) => {
      crepe.editor.config(async (ctx) => {
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            this.value = markdown;
            this.onChange(markdown);
            console.log(markdown)
          }
        });
      });
    })
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
      debounce(async ()=>{
        await this.render();
      });
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

  defaultPlugins: NgMilkdownPlugin[] = [listener];
  loadedPlugins: NgMilkdownPlugin[] = [];
  pluginsToLoad: NgMilkdownPlugin[] = [];
  pluginsToUnload: NgMilkdownPlugin[] = [];

  @Input() set plugins(plugins: NgMilkdownPlugin[]) {
    plugins = plugins.filter((plugin) => !this.defaultPlugins.includes(plugin));
    this.pluginsToLoad = plugins.filter((plugin) => !this.loadedPlugins.includes(plugin));
    this.pluginsToUnload = this.loadedPlugins.filter((plugin) => !plugins.includes(plugin));
    this.loadedPlugins = plugins;
    if(this.editor){
      this.ngZone.runOutsideAngular(async () => {
        await this.editor.remove([...getPlugins(this.pluginsToUnload, this.provider)]);
        this.editor.use([...getPlugins(this.pluginsToLoad, this.provider)]);
      })
    }
  }
  @Output() beforeReady = new EventEmitter<NgMilkdownCrepeEditor>();
  @Output() onReady = new EventEmitter<NgMilkdownCrepeEditor>();

  get editor(): Editor {
    return this.crepe?.editor
  }

  onTouched: () => void = () => {
  };

  onChange: (value: any) => void = (value) => {
    this.onChanged.emit(value)
  };

  @ViewChild('editorRef') editorRef: ElementRef;
  disabled = false;

  async render(): Promise<void> {
      if(!this.editor){
        this.loading = true;
      }
      if (this.crepe) {
        await this.crepe.destroy();
      }
      if (this.value || this.editor) {
        const provider = this.provider;
        const crepe = new Crepe({
          root: this.editorRef.nativeElement,
          defaultValue: this.value,
          features: this.features || {},
          featureConfigs: this.featureConfigs || {},
        });
        setTimeout(async () => {
          crepe.editor.use([
            ...getPlugins(this.defaultPlugins, provider),
            ...getPlugins(this.pluginsToLoad, provider)]
          );
          await crepe.editor.remove([...getPlugins(this.pluginsToUnload, provider)]);
          this.beforeReady.emit({crepe, provider});
          await crepe.create();
          this.crepe = crepe;
          this.loading = false;
          this.loadingChange.emit(false);
          this.onReady.emit({crepe, provider: this.provider});
        });
      }
  }

  async ngAfterViewInit(): Promise<void> {
    debounce(async ()=>{
      await this.render();
    });
  }

  async ngOnDestroy(): Promise<void> {
    this.crepe.destroy();
  }
}
