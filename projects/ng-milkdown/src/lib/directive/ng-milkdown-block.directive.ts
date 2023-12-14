import {AfterViewInit, Directive, Input} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {NgMilkdown} from '../../public-api';
import {BlockProvider, BlockProviderOptions} from "@milkdown/plugin-block";
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";

@Directive({
  selector: 'ng-milkdown-block',
  standalone: true
})
export class NgMilkdownBlock extends NgProsemirrorPlugin implements AfterViewInit {

  @Input() ctx: Ctx;

  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

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
