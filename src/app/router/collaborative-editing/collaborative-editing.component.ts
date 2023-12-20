import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
  NgProsemirrorAdapterProvider
} from "../../../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {HttpClientModule} from "@angular/common/http";
import {ToolBarComponent} from "../../components/tool-bar.component";
import {Editor} from "@milkdown/core";
import {collab, collabServiceCtx} from "@milkdown/plugin-collab";
import {WebsocketProvider} from 'y-websocket';
import {Doc} from "yjs";

@Component({
  selector: 'collaborative-editing',
  template: `
      <div id="top-bar" class="flex justify-between items-center px-4 mt-4">
          <button id="connect"
                  class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-2 py-1 rounded">
              Connect
          </button>
          <button id="disconnect"
                  class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-2 py-1 rounded">
              Disconnect
          </button>
      </div>
      <div class="h-full w-full mt-4">
          <ng-prosemirror-adapter-provider #provider>
              <ng-milkdown
                      [classList]="['border', 'border-nord4']"
                      [plugins]="plugins"
                      [(ngModel)]="value"
                      (onReady)="onReady($event)"
              />
          </ng-prosemirror-adapter-provider>
      </div>
  `,
  styles: [],
  imports: [CommonModule, RouterOutlet, FormsModule, NgProsemirrorAdapterProvider, NgMilkdown, HttpClientModule, ToolBarComponent],
  standalone: true
})
export class CollaborativeEditingComponent {

  value = `Setting up a WebSocket server on \`port\` **3001**, and click \`connect\` button, then you can test \`collab plugin\` in two browser tabs, ensure use **same** \`room name\`!
  \`\`\`bash
  mkdir websocket-example && cd websocket-example
  npm install ws
  \`\`\`

  server.ts
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
  plugins = [collab];

  onReady(editor: Editor) {
    const roomName :string = prompt('Enter room name', 'ng-milkdown')
    const doc = new Doc();
    const wsProvider = new WebsocketProvider('ws://localhost:3001', roomName, doc);
    editor.action((ctx) => {
      const collabService = ctx.get(collabServiceCtx);
      collabService.bindDoc(doc).setAwareness(wsProvider.awareness);

      document.getElementById('connect').onclick = () => {
        wsProvider.connect();
        collabService.connect();
      };

      document.getElementById('disconnect').onclick = () => {
        wsProvider.disconnect();
        collabService.disconnect();
      };
    });
  }
}
