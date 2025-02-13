import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EditorState, Extension} from "@codemirror/state";
import {basicSetup} from "codemirror";
import {markdown} from "@codemirror/lang-markdown";
import {oneDark} from "@codemirror/theme-one-dark";
import {EditorView} from "@codemirror/view";
import {debounce} from "../../shared/debounce_throttle";

@Component({
  selector: 'codemirror',
  template: `
    <div #editorInstance [class]="classList" style="background: #282c34"></div>
  `,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true
    }
  ]
})
export class CodemirrorComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
  @ViewChild('editorInstance') editorInstance!: ElementRef;
  _value: string = "";
  @Input() classList: string[];
  disabled: boolean | undefined;

  @Input() set value(doc: string) {
    this._value = doc;
    debounce(() => {
      this.initEditor();
    });
  }

  get value(): string {
    return this._value;
  }


  private onChange: (value: string) => void = () => {
  };
  editorView: EditorView | undefined;
  onTouched = () => {

  }

  constructor() {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    debounce(() => {
      this.initEditor([EditorView.editable.of(!isDisabled)]);
    });
  }

  ngAfterViewInit(): void {
    debounce(() => {
      this.initEditor();
    });
  }

  ngOnDestroy() {
    this.editorView?.destroy();
  }

  @Input() language: 'markdown' = 'markdown';

  initEditor(ext: any[] = []) {
    setTimeout(() => {
      let editorEle = this.editorInstance.nativeElement;
      let extensions: Extension = [basicSetup, markdown().language, oneDark, EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          this._value = update.state.doc.toString();
          this.onChange(this._value);
        }
      }), ...ext];
      try {
        let state = EditorState.create({
          doc: this.value,
          extensions,
        });

        if (this.editorView) {
          this.editorView.setState(state)
        } else {
          this.editorView = new EditorView({
            state,
            parent: editorEle,
          });
        }
      } catch (e) {
        console.error(e);
      }
    })
  }
}
