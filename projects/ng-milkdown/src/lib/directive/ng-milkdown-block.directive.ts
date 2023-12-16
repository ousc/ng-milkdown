import {AfterViewInit, Directive, Input} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {BlockProvider, BlockProviderOptions} from "@milkdown/plugin-block";
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";
import {actionFactory} from "../actionFactory";

@Directive({
  selector: 'ng-milkdown-block',
  standalone: true
})
export class NgMilkdownBlock extends NgProsemirrorPlugin implements AfterViewInit {

  @Input() ctx: Ctx;

  get action() {
    return actionFactory(this.provider.editor)
  };

  loading = true;

  override get pluginView() {
    return new BlockProvider({
      ctx: this.ctx,
      content: this.el.nativeElement
    } as BlockProviderOptions) as any;
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

}
