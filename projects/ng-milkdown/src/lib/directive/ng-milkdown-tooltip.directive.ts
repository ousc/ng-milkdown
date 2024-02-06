import {Directive} from '@angular/core';
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {NgMilkdownPluginComp} from "./ng-milkdown-plugin.directive";

export const hiddenDiv = () => {
  const container = document.querySelector('#ng-milkdown-hidden') as HTMLElement;
  if (container) {
    return container
  } else {
    const tooltipContainer = document.createElement('div');
    tooltipContainer.id = `ng-milkdown-hidden`;
    tooltipContainer.style.display = 'none';
    document.body.appendChild(tooltipContainer);
    return tooltipContainer
  }
}

@Directive({
  selector: 'ng-milkdown-tooltip',
  standalone: true,
})
export class NgMilkdownTooltip extends NgMilkdownPluginComp {
  get tooltipProvider(): TooltipProvider {
    return this.provider?.service?.pluginView[this.key] as unknown as TooltipProvider;
  }

  override get parentView() {
    return hiddenDiv();
  }

  override get pluginView() {
    return new TooltipProvider({content: this.container, debounce: 50, tippyOptions: {appendTo: document.body}}) as any;
  }
}
