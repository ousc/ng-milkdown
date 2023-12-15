import {Component} from '@angular/core';
import {
  NgProsemirrorWidget
} from "../../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-widget.component";

@Component({
  selector: 'link-widget-before',
  template: `[`,
  styles: [],
  standalone: true
})
export class LinkWidgetBefore extends NgProsemirrorWidget {}
