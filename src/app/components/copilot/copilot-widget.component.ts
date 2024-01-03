import {Component} from '@angular/core';
import {NgMilkdownWidget} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-widget.directive";

@Component({
  selector: 'copilot-widget',
  template: `<span class="text-gray-50">[提示：{{message}}]</span>`,
  styles: [],
  standalone: true
})
export class CopilotWidget extends NgMilkdownWidget {
  get message(){
    return this.spec?.message;
  }
}
