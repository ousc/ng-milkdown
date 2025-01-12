import {Component, ElementRef} from '@angular/core';
import {$ctx, $prose} from "@milkdown/utils";
import {Plugin} from "@milkdown/prose/state";
import {NgMilkdownPluginComp} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-plugin.directive";
import {NgMilkdownProvider} from "../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";

@Component({
  selector: 'size',
  template: `
      <small class="select-none text-indigo-800">Words: {{size}}</small>
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

export function sizePlugin(provider: NgMilkdownProvider) {
  return $prose(ctx => {
    return new Plugin({
      view: provider.createPluginView({component: Size}),
    })
  })
}
