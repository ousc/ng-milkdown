import {Component} from '@angular/core';
import {NgMilkdownDiagram} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-diagram.directive";
@Component({
  selector: 'diagram',
  template: `
      <div class="border-2 border-gray-300 rounded-md p-2 flex justify-center items-center hover:bg-gray-100">
      </div>
  `,
  styles:[`

  `],
  standalone: true
})
export class Diagram extends NgMilkdownDiagram {
  override get container(): any {
    return super.container.children[0];
  }
}
