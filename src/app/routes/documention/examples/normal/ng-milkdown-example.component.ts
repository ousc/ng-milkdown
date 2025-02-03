import {Component, OnInit} from "@angular/core";
import {AppService} from "../../../../app.service";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {imageInlineComponent} from '@milkdown/kit/component/image-inline'
import {iframeComponent} from "../../../../components/milkdown-plugins/iframe.component";
import {history} from '@milkdown/kit/plugin/history';
import {block} from '@milkdown/plugin-block';
import {trailing} from '@milkdown/kit/plugin/trailing';
import {indent} from '@milkdown/kit/plugin/indent';
import {NgMilkdown} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {commonmark} from '@milkdown/kit/preset/commonmark';
import {ListItem} from "../../../../components/ng-milkdown-plugins/list-item.component";
import {blockquoteAttr, inlineCodeAttr, listItemSchema} from "@milkdown/preset-commonmark";
import {$nodeView, $pluginView, $prosePlugin} from "../../../../../../projects/ng-milkdown/src/lib/actionFactory";
import {editorViewOptionsCtx} from "@milkdown/core";
import '@milkdown/theme-nord/style.css';
import {linkPlugin} from "../../../../components/ng-milkdown-plugins/link-widget/linkPlugin";
import {tooltipFactory} from "@milkdown/plugin-tooltip";
import {tableTooltip} from "../../../../components/table-selector/table-tooltip.component";
import {Tooltip} from "../../../../components/ng-milkdown-plugins/tooltip/tooltip.component";
import {Block} from "../../../../components/ng-milkdown-plugins/block.component";
import {Size} from "../../../../components/ng-milkdown-plugins/size.component";


const tooltip = tooltipFactory('text-tooltip');

@Component({
  selector: 'ng-milkdown-d',
  template: `
    <div class="relative h-full overflow-auto">
      <div class="h-full overflow-auto overscroll-none ctn flex flex-col px-4">
        <ng-milkdown-provider #provider>
          <ng-milkdown
            [(ngModel)]="value"
            [plugins]="plugins"
            [(loading)]="loading"
            [spinner]="spinner"
            (beforeReady)="beforeReady($event)"
          />
          <ng-template #spinner>
            <spinner/>
          </ng-template>
        </ng-milkdown-provider>
      </div>
    </div>

  `,
  imports: [
    NgMilkdown,
    NgMilkdownProvider,
    Spinner,
    FormsModule
  ],
  styles: [
    `
      :host::ng-deep .milkdown .ProseMirror {
        padding: 60px 120px;
      }
    `
  ],
  standalone: true
})
export class NgMilkdownExampleComponent implements OnInit {
  constructor(private http: HttpClient, private appService: AppService) {
  }

  value: string = null;

  async ngOnInit(): Promise<void> {
    this.http.get(`assets/markdowns/${this.appService.language}/ng-milkdown.md`, {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  plugins = [
    commonmark,
    linkPlugin,
    history,
    imageInlineComponent,
    iframeComponent,
    trailing,
    block,
    indent,
    $pluginView(block.key, {component: Block}),
    $nodeView(listItemSchema.node, {component: ListItem}),
    tooltip,
    $pluginView(tooltip.key, {component: Tooltip}),
    $prosePlugin({component: Size})
  ];

  loading = true;

  beforeReady({editor, provider}: NgMilkdownEditor) {
    editor.config(ctx => {
      ctx.set(editorViewOptionsCtx, {
        attributes: {
          class: "prose dark:prose-invert outline-none mx-auto px-2 py-4 max-w-full box-border milkdown-theme-nord editor",
          spellcheck: "false",
        },
      });

      ctx.set(blockquoteAttr.key, () => ({
        class: "border-l-4 border-nord10 pl-4 dark:border-nord8",
      }));

      ctx.set(inlineCodeAttr.key, () => ({
        class: "font-mono text-nord10 tracking-tight dark:text-nord8",
      }));
    });
  }
}
