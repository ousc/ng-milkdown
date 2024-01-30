import {AfterViewInit, Directive, Input} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {BlockProvider, BlockProviderOptions} from "@milkdown/plugin-block";
import {NgMilkdownPluginComp} from "./ng-milkdown-plugin.directive";

@Directive({
  selector: 'ng-milkdown-block',
  standalone: true
})
export class NgMilkdownBlock extends NgMilkdownPluginComp implements AfterViewInit {

  @Input() ctx: Ctx;

  override get pluginView() {
    return new BlockProvider({
      ctx: this.ctx,
      content: this.el.nativeElement
    } as BlockProviderOptions) as any;
  }
}
