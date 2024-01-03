import {Directive} from '@angular/core';
import {actionFactory} from "../actionFactory";
import {NgProsemirrorNode} from "ng-prosemirror-adapter";

@Directive({
  selector: 'ng-milkdown-node',
  standalone: true
})
export class NgMilkdownNode extends NgProsemirrorNode {
  get action() {
    return actionFactory(this.provider.editor)
  };
}
