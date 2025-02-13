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
      content: this.container,
      getOffset: () => 16,
      getPlacement: ({ active, blockDom }) => {
        if (active.node.type.name === 'heading') return 'left'

        let totalDescendant = 0
        active.node.descendants((node) => {
          totalDescendant += node.childCount
        })
        const dom = active.el
        const domRect = dom.getBoundingClientRect()
        const handleRect = blockDom.getBoundingClientRect()
        const style = window.getComputedStyle(dom)
        const paddingTop = Number.parseInt(style.paddingTop, 10) || 0
        const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0
        const height = domRect.height - paddingTop - paddingBottom
        const handleHeight = handleRect.height
        return totalDescendant > 2 || handleHeight < height
          ? 'left-start'
          : 'left'
      },
    } as BlockProviderOptions) as any;
  }
}
