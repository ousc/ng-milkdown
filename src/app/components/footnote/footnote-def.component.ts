import {Component} from '@angular/core';
import {NgMilkdownNodeComp} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";

@Component({
  selector: 'footnote',
  template: `
      <dl class="relative flex gap-2 rounded border-2 border-gray-300 bg-gray-50 p-3 dark:border-gray-500 dark:bg-gray-900"
          [attr.id]="'footnote-' + label + '-def'"
      >
          <dt class="text-nord8">{{ label }}:</dt>
          <dd class="not-prose min-w-0 footnote-def"></dd>
          <div contentEditable="false" class="absolute top-0 right-0 cursor-pointer">
              <a class="p-2 text-nord8" [href]="'#footnote-' + label + '-ref'">
                  ↩
              </a>
          </div>
      </dl>
  `,
  styles: [`
    dt {
      margin: 0;
    }
  `],
  standalone: true
})
export class FootnoteDef extends NgMilkdownNodeComp {

  get label() {
    return this.node.attrs?.label;
  }

  override get container() {
    return this.el.nativeElement.querySelector('.footnote-def') as HTMLElement;
  }
}
