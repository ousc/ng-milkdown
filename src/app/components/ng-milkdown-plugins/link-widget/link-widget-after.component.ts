import {Component, ElementRef} from '@angular/core';
import {commandsCtx} from "@milkdown/core";
import {updateLinkCommand} from "@milkdown/preset-commonmark";
import {FormsModule} from "@angular/forms";
import {NgMilkdownWidgetComp} from "../../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-widget.directive";

@Component({
  selector: 'link-widget-after',
  template: `
    <span>](<a [href]="href" target="_blank" class="text-blue-500 underline">
           <span class="material-symbols-outlined text-nord-10 dark:text-nord-9"
                 style="vertical-align: middle">link</span>
      {{ title || href || 'empty' }}
          </a>
          &nbsp;
          <small class="font-light text-nord8">link: </small>
                  <input
                    [size]="href?.length || 5"
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
              [size]="title?.length || 5"
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
export class LinkWidgetAfter extends NgMilkdownWidgetComp {
  constructor(override el: ElementRef) {
    super(el);
  }


  get href() {
    return this.spec.href;
  }

  get title() {
    return this.spec.title;
  }

  set href(href: string) {
    this.spec.href = href;
  }

  set title(title: string) {
    this.spec.title = title;
  }

  onHrefBlur(e: FocusEvent) {
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, {
        href: (e.target as HTMLInputElement).value || '',
      });
    });
  }

  onTitleBlur(e: FocusEvent) {
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateLinkCommand.key, {
        title: (e.target as HTMLInputElement).value || '',
      });
    });
  }
}
