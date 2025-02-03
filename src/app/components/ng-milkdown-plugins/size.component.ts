import {Component, ElementRef} from '@angular/core';
import {NgMilkdownPluginComp} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-plugin.directive";
import {$prosePlugin} from "../../../../projects/ng-milkdown/src/lib/actionFactory";

@Component({
  selector: 'size',
  template: `
    <small
      class="select-none text-indigo-800 bg-white bg-opacity-25 p-1 backdrop-blur-sm rounded-md">Words: {{ size }}</small>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ],
  standalone: true
})
export class Size extends NgMilkdownPluginComp {
  constructor(override el: ElementRef) {
    super(el);
  }

  get size(): number | undefined {
    return this.state?.doc?.nodeSize;
  }

  override get parentView(): HTMLElement {
    return document.querySelector("#size") as HTMLElement;
  }
}
