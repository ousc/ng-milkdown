import {AfterViewInit, Directive} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {SlashProvider} from '@milkdown/plugin-slash';
import {NgMilkdown} from '../../public-api';
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";

@Directive({
  selector: 'ng-milkdown-slash',
  standalone: true
})
export class NgMilkdownSlash extends NgProsemirrorPlugin implements AfterViewInit {
  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

  loading = true;

  ngAfterViewInit(): void {
    this.loading = false;
  }

  override get pluginView() {
    return new SlashProvider({
      content: this.el.nativeElement,
      tippyOptions: {
        onMount: (_) => {
          const slashMenu = (this.el.nativeElement?.querySelector(".slash-menu"));
          if (slashMenu) {
            slashMenu.focus();
          } else {
            console.warn("Slash menu not found. Please add a `slash-menu` class to the menu element which you want to focus on mount.")
          }
        }
      }
    }) as any;
  }
}

