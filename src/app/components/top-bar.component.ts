import {Component, Inject, Input} from '@angular/core';
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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {createMathBlockCommand, insertTaskListCommand} from './enhance';

@Component({
  selector: 'top-bar',
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

  constructor(private copilotService: CopilotService, public dialog: MatDialog) {
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
      title: 'Task List',
      icon: 'checklist',
      slice: insertTaskListCommand.key,
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
      title: 'Math Block',
      icon: 'functions',
      slice: createMathBlockCommand.key,
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
      title: 'Config copilot',
      icon: 'settings',
      className: ['hidden-sm'],
      click: () => {
        const dialogRef = this.dialog.open(CopilotDialog, {
          data: {
            config: localStorage.getItem('openai-api-config') ?? "{}",
            url: localStorage.getItem('openai-api-url'),
            token: localStorage.getItem('openai-api-token')
          },
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            localStorage.setItem('openai-api-config', result.config || "{}");
            localStorage.setItem('openai-api-url', result.url);
            localStorage.setItem('openai-api-token', result.token);
          }
        });
      },
      hidden: () => this.copilotService.enabled
    },
    {
      title: 'Copilot is running, click to close copilot',
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

export interface DialogData {
  config: string;
  url: string;
  token: string;
}

@Component({
  selector: 'copilot-dialog',
  template: `
      <h1 mat-dialog-title>Complete Openai info to enable copilot</h1>
      <div mat-dialog-content>
          <mat-form-field class="w-full">
              <mat-label>Openai Api Config</mat-label>
              <textarea matInput [(ngModel)]="data.config" [rows]="4"></textarea>
          </mat-form-field>
          <mat-form-field class="w-full">
              <mat-label>Openai Api Url</mat-label>
              <input matInput [(ngModel)]="data.url" placeholder="https://api.openai.com/v1/completions">
          </mat-form-field>
          <mat-form-field class="w-full">
              <mat-label>Openai Api Token</mat-label>
              <input matInput [(ngModel)]="data.token" placeholder="sk-xxxxxxxxxxxxxxx">
          </mat-form-field>
      </div>
      <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()">Cancel</button>
          <button mat-button [mat-dialog-close]="data.config && data.url && data.token" (click)="onClick()">Ok</button>
      </div>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CopilotDialog {
  constructor(
    public dialogRef: MatDialogRef<CopilotDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

  onClick(): void {
    this.dialogRef.close(this.data);
  }
}
