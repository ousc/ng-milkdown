```typescript
import {Component, ElementRef} from '@angular/core';
import {$ctx, $prose} from "@milkdown/utils";
import {Plugin} from "@milkdown/prose/state";
import {$provide, NgMilkdownPluginComp, NgMilkdownProvider} from "ng-milkdown";

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

export const sizePlugin = $provide((provider: NgMilkdownProvider) => $prose(ctx => new Plugin({
    view: provider.createPluginView({component: Size}),
  })
));

```
