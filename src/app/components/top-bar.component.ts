import {Component, Input} from '@angular/core';
import {actionFactory} from "../../../projects/ng-milkdown/src/lib/actionFactory";
import {redoCommand, undoCommand} from '@milkdown/plugin-history';
import {
  createCodeBlockCommand,
  insertHrCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand
} from "@milkdown/preset-commonmark";
import {callCommand} from '@milkdown/utils';
import {insertTableCommand, toggleStrikethroughCommand} from "@milkdown/preset-gfm";
import {insertDiagramCommand} from "@milkdown/plugin-diagram";
import {CmdKey} from "@milkdown/core";
import {RouterLink} from "@angular/router";
import {NgMilkdownProvider} from "../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {CopilotService} from "./copilot/copilot.service";

@Component({
  selector: 'tool-bar',
  template: `
      <div class="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
          <div class="prose mx-auto flex">
              @for (item of navBarItems;track $index) {
                  @if (!item.hidden || !item.hidden()) {
                      <div
                              class="flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
                              [title]="item.title"
                              (mousedown)="onMouseDown($event, item.slice, item.payload, item.click)"
                              (touchstart)="onMouseDown($event, item.slice, item.payload, item.click)"
                              [class]="item.className"
                              [routerLink]="item.routerLink"
                      >
                          <span class="material-symbols-outlined !text-base">{{ item.icon }}</span>
                      </div>
                  }
              }
          </div>
      </div>
  `,
  styles: [`
    @media(max-width: 768px) {
      .hidden-sm {
        display: none;
      }
    }

    @media(max-width: 640px) {
      .hidden-xs {
        display: none;
      }
    }
  `],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class TopBarComponent {
  @Input() provider: NgMilkdownProvider;

  constructor(private copilotService: CopilotService) {
  }

  get action() {
    return actionFactory(this.provider.editor);
  }

  navBarItems = [
    {
      title: 'Undo',
      icon: 'undo',
      slice: undoCommand.key,
    },
    {
      title: 'Redo',
      icon: 'redo',
      slice: redoCommand.key,
    },
    {
      title: 'Heading 1',
      icon: 'looks_one',
      slice: wrapInHeadingCommand.key,
      payload: 1,
      className: ['hidden-xs']
    },
    {
      title: 'Heading 2',
      icon: 'looks_two',
      slice: wrapInHeadingCommand.key,
      payload: 2,
      className: ['hidden-sm']
    },
    {
      title: 'Heading 3',
      icon: 'looks_3',
      slice: wrapInHeadingCommand.key,
      payload: 3,
      className: ['hidden-sm']
    },
    {
      title: 'Bold',
      icon: 'format_bold',
      slice: toggleStrongCommand.key,
    },
    {
      title: 'Italic',
      icon: 'format_italic',
      slice: toggleEmphasisCommand.key,
    },
    {
      title: 'Strikethrough',
      icon: 'format_strikethrough',
      slice: toggleStrikethroughCommand.key,
    },
    {
      title: 'Table',
      icon: 'table',
      slice: insertTableCommand.key,
    },
    {
      title: 'Divider',
      icon: 'horizontal_rule',
      slice: insertHrCommand.key,
      payload: {mode: 'horizontal'},
    },
    {
      title: 'Diagram',
      icon: 'rebase',
      slice: insertDiagramCommand.key,
      className: ['hidden-sm']
    },
    {
      title: 'Bullet List',
      icon: 'format_list_bulleted',
      slice: wrapInBulletListCommand.key,
    },
    {
      title: 'Ordered List',
      icon: 'format_list_numbered',
      slice: wrapInOrderedListCommand.key,
    },
    {
      title: 'Code Block',
      icon: 'code_blocks',
      slice: createCodeBlockCommand.key,
    },
    {
      title: 'Quote Block',
      icon: 'format_quote',
      slice: wrapInBlockquoteCommand.key,
    },
    {
      title: 'Test collaborative Editing',
      icon: 'partner_exchange',
      className: ['hidden-sm'],
      routerLink: ['/collaborative-editing']
    },
    {
      title: 'Open copilot',
      icon: 'smart_toy',
      className: ['hidden-sm'],
      click: () => this.copilotService.enabled = true,
      hidden: () => this.copilotService.enabled
    },
    {
      title: 'Close copilot',
      icon: 'smart_toy',
      className: ['hidden-sm', 'text-red-500'],
      click: () => this.copilotService.enabled = false,
      hidden: () => !this.copilotService.enabled
    }
  ]

  onMouseDown(e: MouseEvent | TouchEvent, slice: CmdKey<any>, payload?: any, click?: () => void) {
    e.preventDefault();
    if (slice)
      this.action(callCommand(slice, payload));
    if (click)
      click();
  }
}
