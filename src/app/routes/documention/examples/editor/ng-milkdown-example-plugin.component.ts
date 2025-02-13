import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {SegmentedComponent} from "../../../../components/documentation/segmented.component";
import {NgMilkdown} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {$nodeView, $prosePlugin} from "../../../../../../projects/ng-milkdown/src/lib/actionFactory";
import {CodeBlock} from "../../../../components/ng-milkdown-plugins/code-block.component";
import {blockquoteAttr, codeBlockSchema, inlineCodeAttr, listItemSchema} from "@milkdown/preset-commonmark";
import {milkShiki} from "../../../../components/milkdown-plugins/shiki";
import {CodemirrorComponent} from "../../../../components/documentation/codemirror.component";
import {ListItem} from "../../../../components/ng-milkdown-plugins/list-item.component";
import {trailing} from "@milkdown/kit/plugin/trailing";
import {Size} from "../../../../components/ng-milkdown-plugins/size.component";
import {AppService} from "../../../../app.service";
import {imageInlineComponent} from "@milkdown/kit/component/image-inline";
import '@milkdown/theme-nord/style.css';
import {NgMilkdownEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {editorViewOptionsCtx} from "@milkdown/core";

@Component({
  selector: 'ng-milkdown-example-plugin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMilkdown, NgMilkdownProvider, Spinner, SegmentedComponent, CodemirrorComponent],
  template: `
    <article class="prose lg:prose-xl"></article>
    <div class="relative h-full">
      <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                 [options]="['demo', 'example.component.html', 'example.component.ts', 'size.component.ts']"
                 [icons]="['preview', 'html', 'code', 'code']"
                 (ngModelChange)="handleSegmentedChange()"
      />
      <div class="h-full overflow-auto overscroll-none ctn flex flex-row mt-10">
        <div [class.px-24]="selected === 'demo'"
          [class]="['flex-1', 'overflow-y-auto']">
          <ng-milkdown-provider>
            <ng-milkdown
              [(ngModel)]="value"
              [(loading)]="loading"
              [plugins]="plugins"
              (ngModelChange)="onChange($event)"
              (beforeReady)="beforeReady($event)"
              [spinner]="spinner"
            />
            <ng-template #spinner>
              <spinner/>
            </ng-template>
          </ng-milkdown-provider>
        </div>
      </div>
    </div>
  `,
  styles:
    `
      ::ng-deep .milkdown .ProseMirror {
        padding: 0 !important;
      }
    `
})
export class NgMilkdownExamplePluginComponent implements OnInit {
  constructor(private http: HttpClient, private appService: AppService) {
  }

  selected = 'demo';
  value: string;
  loading = true;

  plugins = [
    imageInlineComponent,
    trailing,
    $nodeView(listItemSchema.node, {component: ListItem}),
    milkShiki,
    $nodeView(codeBlockSchema.node, {component: CodeBlock}),
    $prosePlugin({component: Size})
  ];

  async ngOnInit(): Promise<void> {
    this.handleSegmentedChange();
  }

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  handleSegmentedChange() {
    if (this.selected === 'example.component.html') {
      this.http.get('assets/markdowns/ng-milkdown-example-plugin/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.http.get('assets/markdowns/ng-milkdown-example-plugin/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'size.component.ts') {
      this.http.get('assets/markdowns/ng-milkdown-example-plugin/typescript2.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else {
      this.http.get(`assets/markdowns/${this.appService.language}/overview.md`, {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    }
    console.log(this.value);
  }

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
