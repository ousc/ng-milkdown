import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  NgProsemirrorAdapterProvider
} from "../../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {actionFactory} from "../../../projects/ng-milkdown/src/lib/actionFactory";
import {redoCommand, undoCommand} from '@milkdown/plugin-history';
import {Is, when} from "conditio";
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

@Component({
  selector: 'nav-bar-button',
  standalone: true,
  template: `
      <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
           (mousedown)="onMouseDown($event)">
        <span class="material-symbols-outlined !text-base">
            <ng-content/>
        </span>
      </div>
  `,
})
export class NavBarBtnComponent {
  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onMouseDown(e: MouseEvent){
    e.preventDefault();
    this.onClick.emit(e);
  }
}

@Component({
  selector: 'tool-bar',
  template: `
      <div class="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
          <div class="prose mx-auto flex">
              <nav-bar-button (onClick)="call('undo')">undo</nav-bar-button>
              <nav-bar-button (onClick)="call('redo')">redo</nav-bar-button>
              <nav-bar-button class="hidden-xs" (onClick)="call('wrapInHeading', 1)">looks_one</nav-bar-button>
              <nav-bar-button class="hidden-sm" (onClick)="call('wrapInHeading', 2)">looks_two</nav-bar-button>
              <nav-bar-button class="hidden-sm" (onClick)="call('wrapInHeading', 3)">looks_3</nav-bar-button>
              <nav-bar-button (onClick)="call('toggleStrong')">format_bold</nav-bar-button>
              <nav-bar-button (onClick)="call('toggleEmphasis')">format_italic</nav-bar-button>
              <nav-bar-button (onClick)="call('toggleStrikethrough')">format_strikethrough</nav-bar-button>
              <nav-bar-button class="hidden-xs" (onClick)="call('insertTable')">table</nav-bar-button>
              <nav-bar-button (onClick)="call('insertHr')">horizontal_rule</nav-bar-button>
              <nav-bar-button class="hidden-sm" (onClick)="call('insertDiagram')">rebase</nav-bar-button>
              <nav-bar-button (onClick)="call('wrapInBulletList')">format_list_bulleted</nav-bar-button>
              <nav-bar-button (onClick)="call('wrapInOrderedList')">format_list_numbered</nav-bar-button>
              <nav-bar-button class="hidden-sm" (onClick)="call('wrapInCodeBlock')">data_object</nav-bar-button>
              <nav-bar-button (onClick)="call('wrapInBlockquote')">format_quote</nav-bar-button>
          </div>
      </div>
  `,
  styles: [`
    @media(max-width: 768px){
      .hidden-sm {
        display: none;
      }
    }

    @media(max-width: 640px){
      .hidden-xs {
        display: none;
      }
    }
  `],
  imports: [
    NavBarBtnComponent
  ],
  standalone: true
})
export class ToolBarComponent {
  @Input() provider: NgProsemirrorAdapterProvider;

  get action() {
    return actionFactory(this.provider.editor);
  }

  call(cmd: string, payload?: any) {
    const slice = when(cmd)(
      Is('undo', undoCommand.key),
      Is('redo', redoCommand.key),
      Is('toggleStrong', toggleStrongCommand.key),
      Is('toggleEmphasis', toggleEmphasisCommand.key),
      Is('toggleStrikethrough', toggleStrikethroughCommand.key),
      Is('insertTable', insertTableCommand.key),
      Is('insertHr', insertHrCommand.key),
      Is('insertDiagram', insertDiagramCommand.key),
      Is('wrapInBulletList', wrapInBulletListCommand.key),
      Is('wrapInOrderedList', wrapInOrderedListCommand.key),
      Is('wrapInHeading', wrapInHeadingCommand.key),
      Is('wrapInCodeBlock', createCodeBlockCommand.key),
      Is('wrapInBlockquote', wrapInBlockquoteCommand.key),
    );
    this.action(callCommand(slice, payload));
  }
}
