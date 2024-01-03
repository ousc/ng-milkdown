import {Directive} from '@angular/core';
import {actionFactory} from "../actionFactory";
import {NgProsemirrorWidget} from "ng-prosemirror-adapter";

@Directive({
  selector: 'ng-milkdown-widget',
  standalone: true
})
export class NgMilkdownWidgetComp extends NgProsemirrorWidget {
  get action() {
    return actionFactory(this.provider.editor)
  };
}
