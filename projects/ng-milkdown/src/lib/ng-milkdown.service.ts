import {Injectable} from '@angular/core';
import {Editor} from "@milkdown/core";

@Injectable()
export class NgMilkdownService {
  constructor() {
  }

  loading = true;
  editor: Editor = undefined;
  GetEditor = () => this.editor;

  get editorReturn() {
    return {
      loading: this.loading,
      get: this.GetEditor
    }
  }

  get instance() {
    return [this.loading, this.GetEditor]
  }
}
