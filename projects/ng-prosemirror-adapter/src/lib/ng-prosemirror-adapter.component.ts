import {
  Component, ContentChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgProsemirrorAdapterService} from "./ng-prosemirror-adapter.service";
import {NgProsemirrorEditor} from "./components/ng-prosemirror-editor.component";

@Component({
  selector: 'ng-prosemirror-adapter-provider',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content/>`,
  styles: `
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
  `,
  providers: [NgProsemirrorAdapterService]
})
export class NgProsemirrorAdapterProvider {

  private _editorComp: NgProsemirrorEditor;

  @ContentChild(NgProsemirrorEditor, {static: false})
  public set editor(value: NgProsemirrorEditor) {
    this._editorComp = value;
    if (value) {
      this._editorComp.provider = this;
      this.service.editor = this._editorComp;
    }
  }

  public get editor() {
    return this._editorComp;
  }

  constructor(
    public service: NgProsemirrorAdapterService) {
    this.service.provider = this;
  }

  public createNodeView = this.service.createNodeView;
  public createPluginView = this.service.createPluginView;
  public createWidgetView = this.service.createWidgetView;
}
