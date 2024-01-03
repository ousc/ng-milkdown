import {Component} from '@angular/core';
import {NgMilkdownNode} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-node.directive";

@Component({
  selector: 'footnote',
  template: `
      <sup>
          <a [attr.id]="'footnote-' + label + '-ref'" class="text-nord8" [href]="'#footnote-' + label + '-def'">
        {{ label }}
      </a>
    </sup>
  `,
  styles: [],
  standalone: true
})
export class FootnoteRef extends NgMilkdownNode {

  get label() {
    return this.node.attrs?.label;
  }
}
