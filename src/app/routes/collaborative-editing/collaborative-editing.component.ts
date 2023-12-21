import {Component, Inject, OnDestroy} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
  NgProsemirrorAdapterProvider
} from "../../../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {HttpClientModule} from "@angular/common/http";
import {ToolBarComponent} from "../../components/tool-bar.component";
import {Editor, editorViewCtx, editorViewOptionsCtx} from "@milkdown/core";
import {collab, collabServiceCtx} from "@milkdown/plugin-collab";
import {WebsocketProvider} from 'y-websocket';
import {Doc} from "yjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Ctx} from "@milkdown/ctx";
import {prism} from "@milkdown/plugin-prism";

export interface DialogData {
  roomName: string;
  serverUrl: string;
}

@Component({
  selector: 'collaborative-editing',
  template: `
      <div class="relative h-full">
          <div id="top-bar" class="flex justify-between items-center px-4 py-2">
              <button [routerLink]="['/']"
                      class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-2 py-1 rounded">
                  <span class="material-symbols-outlined !text-base">home</span>
              </button>
              <div>
                  <span [class]="['dot', 'mr-2']" [class.connecting]="connecting"></span>
                  <button id="connect" [hidden]="connecting"
                          class="bg-gray-200 dark:bg-green-600 hover:bg-green-300 dark:hover:bg-gray-500 px-2 py-1 rounded">
                      Connect
                  </button>
                  <button id="disconnect" [hidden]="!connecting"
                          class="bg-gray-200 dark:bg-red-600 hover:bg-red-300 dark:hover:bg-gray-500 px-2 py-1 rounded">
                      Disconnect
                  </button>
              </div>
              <div></div>
          </div>
          <ng-prosemirror-adapter-provider #provider>
              <ng-milkdown
                      [editorConfig]="config"
                      [classList]="['border', 'border-nord4', 'mx-auto']"
                      [plugins]="plugins"
                      [(ngModel)]="value"
                      (onReady)="onReady($event)"
              />
          </ng-prosemirror-adapter-provider>
      </div>
  `,
  styles: [
    `
      .dot{
        width: 8px;
        height: 8px;
        background: gray;
        border-radius: 4px;
        display: inline-block;
      }

      .connecting {
        background: green;
        animation: jump 2s ease-in-out infinite;
      }

      @keyframes jump {
        0% {
          opacity: 1;
        }
        50% {
          opacity: .2;
        }
        100% {
          opacity: 1;
        }
      }
    `
  ],
  imports: [CommonModule, RouterOutlet, FormsModule, NgProsemirrorAdapterProvider, NgMilkdown, HttpClientModule, ToolBarComponent, RouterLink],
  standalone: true
})
export class CollaborativeEditingComponent implements OnDestroy{

  value = `Setting up a WebSocket server on \`port\` **3001**, and click \`connect\` button, open two browser tabs to try \`collab plugin\`, ensure using **same** \`room name\`!

  Read the milkdown document for [collaborative-editing](https://milkdown.dev/docs/guide/collaborative-editing) before create your angular collaborative-editing-app project.

  \`\`\`bash
  mkdir websocket-example && cd websocket-example
  npm install ws
  \`\`\`

  server.js
  \`\`\`javascript
  const http = require('http');
  const WebSocket = require('ws');
  const fs = require('fs')
  const buffer = require('buffer');

  const server = require("http").createServer((req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      fs.readFile("index.html", (err, data) => {
          if(err){
              res.end("error");
              return
          }
          res.end(data)
      })
  })

  const ws = new WebSocket.Server({server});
  ws.on("connection", ws => {
      console.log("Connect successfully!");
      ws.on("message", e => {
          console.log(e)
          console.log(e.toString())
      })
  })
  server.listen(3001, () => {
      console.log("localhost:3001")
  })
  \`\`\`

  `

  config = (ctx: Ctx) => {
    ctx.set(editorViewOptionsCtx, {
      attributes: {
        class: "prose dark:prose-invert outline-none mx-auto px-2 py-4 box-border milkdown-theme-nord editor",
        spellcheck: "false",
      },
    });
  }
  plugins = [
    prism, collab
  ];

  constructor(public dialog: MatDialog) {
  }

  roomName: string = 'ng-milkdown';
  serverUrl: string = 'ws://localhost:3001';
  connecting = false;
  wsProvider: WebsocketProvider;
  collabService: any;


  onReady(editor: Editor) {
    const dialogRef = this.dialog.open(CollabDialog, {
      data: {roomName: this.roomName, serverUrl: this.serverUrl},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.roomName = result?.roomName || 'ng-milkdown';
      this.serverUrl = result?.serverUrl || 'ws://localhost:3001';
      const doc = new Doc();
      this.wsProvider = new WebsocketProvider(this.serverUrl, this.roomName, doc);
      editor.action((ctx) => {
        this.collabService = ctx.get(collabServiceCtx);
        this.collabService.bindDoc(doc).setAwareness(this.wsProvider.awareness);
        document.getElementById('connect').onclick = () => {
          this.connect(ctx);
        };

        document.getElementById('disconnect').onclick = () => {
          this.disconnect();
        };
      });
    });
  }

  connect(ctx: Ctx){
    if(!this.connecting){
      this.wsProvider.connect();
      this.collabService.connect();
      this.connecting = true;
      console.log('Connect successfully!');

      setTimeout(() => {
        ctx.get(editorViewCtx).focus();
      }, 100);
    }
  }

  disconnect(){
    if(this.connecting){
      this.wsProvider.disconnect();
      this.collabService.disconnect();
      this.connecting = false;
      console.log('Disconnect successfully!');
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}

@Component({
  selector: 'collab-dialog',
  template: `
      <h1 mat-dialog-title>Hi, dear developer.</h1>
      <div mat-dialog-content>
          <p>complete information to start collaborative edit.</p>
          <mat-form-field class="w-full">
              <mat-label>Room name</mat-label>
              <input matInput [(ngModel)]="data.roomName" placeholder="ng-milkdown">
          </mat-form-field>
          <p></p>
          <mat-form-field class="w-full">
              <mat-label>Server url</mat-label>
              <input matInput [(ngModel)]="data.serverUrl" placeholder="ws://localhost:3001">
          </mat-form-field>
      </div>
      <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()">Use default setting</button>
          <button mat-button [mat-dialog-close]="data.serverUrl" (click)="onClick()">Ok</button>
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
export class CollabDialog {
  constructor(
    public dialogRef: MatDialogRef<CollabDialog>,
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
