import {AfterViewInit, Directive} from '@angular/core';
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {actionFactory} from "../actionFactory";
import {NgMilkdownPluginComp} from "./ng-milkdown-plugin.directive";

@Directive({
  selector: 'ng-milkdown-tooltip',
  standalone: true,
})
export class NgMilkdownTooltip extends NgMilkdownPluginComp {
  get tooltipProvider(): TooltipProvider {
    return this.provider?.service?.pluginView[this.key] as unknown as TooltipProvider;
  }

  override get pluginView() {
    return new TooltipProvider({content: this.container, debounce: 50, tippyOptions: {appendTo: document.body}}) as any;
  }
}
