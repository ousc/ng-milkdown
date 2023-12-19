import {AfterViewInit, Directive} from '@angular/core';
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";
import {actionFactory} from "../actionFactory";

@Directive({
  selector: 'ng-milkdown-tooltip',
  standalone: true,
})
export class NgMilkdownTooltip extends NgProsemirrorPlugin implements AfterViewInit {

  get action() {
    return actionFactory(this.provider.editor)
  };

  loading = true;

  ngAfterViewInit(): void {
    this.loading = false;
  }

  get tooltipProvider(): TooltipProvider {
    return this.provider?.service?.pluginView[this.key] as unknown as TooltipProvider;
  }

  override get pluginView() {
    return new TooltipProvider({content: this.container, debounce: 50, tippyOptions: {appendTo: document.body}}) as any;
  }
}
