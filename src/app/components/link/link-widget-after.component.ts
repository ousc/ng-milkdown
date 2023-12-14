import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {
  NgProsemirrorWidget
} from "../../../../projects/ng-prosemirror-adapter/src/lib/components/ng-prosemirror-widget.component";
import {Ctx} from "@milkdown/ctx";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {commandsCtx} from "@milkdown/core";
import {updateLinkCommand} from "@milkdown/preset-commonmark";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'link-widget-after',
  template: `
      <span>](<a href="{{href}}" target="_blank" class="text-blue-500 underline">
           <span class="material-symbols-outlined text-nord-10 dark:text-nord-9" style="vertical-align: middle">link</span>
          {{title || href || 'empty'}}
          </a>
          &nbsp;
          <small class="font-light text-nord8">link: </small>
                  <input
                          [size]="href.length || 5"
                          placeholder="empty"
                          (blur)="onHrefBlur($event)"
                          class="rounded border-none bg-gray-50 py-0 px-2 ring-1 dark:bg-gray-900"
                          type="text"
                          [(ngModel)]="href"
                  />
            &nbsp;
            <small class="font-light text-nord8">title: </small>
            &quot;
            <input
                    [size]="title.length || 5"
                    placeholder="empty"
                    (blur)="onTitleBlur($event)"
                    class="rounded border-none bg-gray-50 py-0 px-2 ring-1 dark:bg-gray-900"
                    type="text"
                    [(ngModel)]="title"
            />
            &quot;)</span>
  `,
  styles: [],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class LinkWidgetAfter extends NgProsemirrorWidget {
  constructor(override el: ElementRef) {
    super(el);
    this.onUpdate.subscribe((context) => {
      this.href = this.spec?.['href'] ?? "";
      this.title = this.spec?.['title'] ?? "";
    });
  }
  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

  href = '';

  onHrefBlur(e: FocusEvent) {
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, {
        href: (e.target as HTMLInputElement).value || '',
      });
    });
  }

  title = '';

  onTitleBlur(e: FocusEvent) {
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, {
        title: (e.target as HTMLInputElement).value || '',
      });
    });
  }
}
