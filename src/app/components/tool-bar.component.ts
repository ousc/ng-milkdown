import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  NgProsemirrorAdapterProvider
} from "../../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {actionFactory} from "../../../projects/ng-milkdown/src/lib/actionFactory";
import {redoCommand, undoCommand} from '@milkdown/plugin-history';
import {Is, when} from "conditio";
import {toggleStrongCommand} from "@milkdown/preset-commonmark";
import { callCommand } from '@milkdown/utils';

@Component({
  selector: 'nav-bar-button',
  standalone: true,
  template: `
      <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded"
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
              <nav-bar-button (click)="call('redo')">redo</nav-bar-button>
              <nav-bar-button (click)="call('toggleStrong')">format_bold</nav-bar-button>
              <nav-bar-button (click)="call('toggleEmphasis')">format_italic</nav-bar-button>
              <nav-bar-button (click)="call('toggleStrikethrough')">format_strikethrough</nav-bar-button>
              <nav-bar-button (click)="call('insertTable')">table</nav-bar-button>
              <nav-bar-button (click)="call('wrapInBulletList')">format_list_bulleted</nav-bar-button>
              <nav-bar-button (click)="call('wrapInOrderedList')">format_list_numbered</nav-bar-button>
              <nav-bar-button (click)="call('wrapInBlockquote')">format_quote</nav-bar-button>
          </div>
      </div>
  `,
  styles: [],
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

  call(cmd: string) {
    const cmdKey = when(cmd)(
      Is('undo', undoCommand.key),
      Is('redo', redoCommand.key),
      Is('toggleStrong', toggleStrongCommand.key),
      Is('toggleEmphasis', toggleStrongCommand.key),
      Is('toggleStrikethrough', toggleStrongCommand.key),
      Is('insertTable', toggleStrongCommand.key),
      Is('wrapInBulletList', toggleStrongCommand.key),
      Is('wrapInOrderedList', toggleStrongCommand.key),
      Is('wrapInBlockquote', toggleStrongCommand.key),
    );
    this.action(callCommand(cmdKey));
  }
}
