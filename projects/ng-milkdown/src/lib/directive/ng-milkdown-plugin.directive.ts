import {AfterViewInit, Directive} from '@angular/core';
import {actionFactory} from "../actionFactory";
import {NgProsemirrorPlugin} from "ng-prosemirror-adapter";

@Directive({
  selector: 'ng-milkdown-plugin',
  standalone: true
})
export class NgMilkdownPlugin extends NgProsemirrorPlugin implements AfterViewInit {

  get action() {
    return actionFactory(this.provider.editor)
  };

  loading = true;

  ngAfterViewInit(): void {
    this.loading = false;
  }
}
