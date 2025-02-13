import {AfterViewInit, Directive, Input} from '@angular/core';
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {NgMilkdownPluginComp} from "./ng-milkdown-plugin.directive";
import {editorViewCtx} from "@milkdown/core";
import {Ctx} from "@milkdown/ctx";

@Directive({
  selector: 'ng-milkdown-tooltip',
  standalone: true,
})
export class NgMilkdownTooltip extends NgMilkdownPluginComp implements AfterViewInit {
  @Input() ctx: Ctx;

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.ctx.get(editorViewCtx).dom.parentElement?.appendChild(this.el.nativeElement);
  }

  override get pluginView() {
    return this.provider?.service?.pluginView[this.key] ?? new TooltipProvider({
      content: this.container,
      debounce: 50,
      shouldShow: () => false
    }) as any;
  }
}
