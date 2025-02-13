import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {
  NgMilkdownProvider
} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {SegmentedComponent} from "../../../../components/documentation/segmented.component";
import {editorViewCtx, editorViewOptionsCtx} from "@milkdown/core";
import {insert} from "@milkdown/kit/utils";
import {TextSelection} from "prosemirror-state";
import {AppService} from "../../../../app.service";
import {NgMilkdown} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {NgMilkdownEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {imageInlineComponent} from '@milkdown/kit/component/image-inline'
import '@milkdown/theme-nord/style.css';
import {trailing} from "@milkdown/kit/plugin/trailing";
import {$nodeView} from "../../../../../../projects/ng-milkdown/src/lib/actionFactory";
import {ListItem} from "../../../../components/ng-milkdown-plugins/list-item.component";
import {milkShiki} from "../../../../components/milkdown-plugins/shiki";
import {CodeBlock} from "../../../../components/ng-milkdown-plugins/code-block.component";
import {blockquoteAttr, codeBlockSchema, inlineCodeAttr, listItemSchema} from "@milkdown/preset-commonmark";

@Component({
  selector: "ng-milkdown-example-outputs",
  standalone: true,
  imports: [CommonModule, FormsModule, NgMilkdownProvider, NgMilkdown, Spinner, SegmentedComponent],
  template: `
    <article class="prose lg:prose-xl"></article>
    <div class="relative h-full">
      <segmented class="fixed top-0 left-0 w-full z-10 opacity-90" [(ngModel)]="selected"
                 [options]="['demo', 'example.component.html', 'example.component.ts']"
                 [icons]="['preview', 'html', 'code']"
                 (ngModelChange)="handleSegmentedChange()"
      />
      <div [class.px-24]="selected === 'demo'"
           class="h-full overflow-auto overscroll-none ctn flex flex-col mt-10">
        <ng-milkdown-provider>
          <ng-milkdown
            [(ngModel)]="value"
            [(loading)]="loading"
            (ngModelChange)="onChange($event)"
            [spinner]="spinner"
            [plugins]="plugins"
            (beforeReady)="beforeReady($event)"
            (onReady)="onReady($event)"
          />
          <ng-template #spinner>
            <spinner/>
          </ng-template>
        </ng-milkdown-provider>
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
export class NgMilkdownExampleOutputsComponent implements OnInit {
  constructor(private http: HttpClient, private appService: AppService) {
  }

  selected = 'demo';
  value: string;
  loading = true;

  async ngOnInit(): Promise<void> {
    this.handleSegmentedChange();
  }

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  plugins = [
    imageInlineComponent,
    trailing,
    $nodeView(listItemSchema.node, {component: ListItem}),
    milkShiki,
    $nodeView(codeBlockSchema.node, {component: CodeBlock}),
  ];

  handleSegmentedChange() {
    if (this.selected === 'example.component.html') {
      this.http.get('assets/markdowns/ng-milkdown-example-outputs/template.md', {responseType: 'text'}).subscribe((markdown) => {
        this.value = markdown;
      })
    } else if (this.selected === 'example.component.ts') {
      this.http.get('assets/markdowns/ng-milkdown-example-outputs/typescript.md', {responseType: 'text'}).subscribe((markdown) => {
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
    console.log('crepe ready!', {editor, provider})
  }

  onReady({editor, provider}: NgMilkdownEditor) {
    if (this.selected === 'demo') {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        ctx.get(editorViewCtx).state.selection = new TextSelection(view.state.doc.resolve(0));
      })
      editor.action(insert("# Welcome to ~~Milkdown~~ NgMilkdown!"));
      editor.action(ctx => {
        // readonly
        ctx.get(editorViewCtx).dispatch = () => {
        };
      })
    }
  }
}
