import {AfterViewInit, Directive} from '@angular/core';
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {Ctx} from "@milkdown/ctx";
import {NgMilkdown} from '../../public-api';
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";

@Directive({
  selector: 'ng-milkdown-tooltip',
  standalone: true,
})
export class NgMilkdownTooltip extends NgProsemirrorPlugin implements AfterViewInit {
  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

  loading = true;

  ngAfterViewInit(): void {
    this.loading = false;
  }

  override get pluginView() {
    return new TooltipProvider({content: this.el.nativeElement}) as any;
  }
}
