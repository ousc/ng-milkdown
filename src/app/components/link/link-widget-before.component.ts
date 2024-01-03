import {Component} from '@angular/core';
import {NgMilkdownWidgetComp} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-widget.directive";

@Component({
  selector: 'link-widget-before',
  template: `[`,
  styles: [],
  standalone: true
})
export class LinkWidgetBefore extends NgMilkdownWidgetComp {}
