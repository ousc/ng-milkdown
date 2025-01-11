import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {HttpClient} from "@angular/common/http";
import {TopBarComponent} from "../../components/top-bar.component";
import {NgMilkdownProvider} from "../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../components/spinner.component";
import {editorViewOptionsCtx} from "@milkdown/core";
import {blockquoteAttr, inlineCodeAttr} from "@milkdown/preset-commonmark";

// export const tooltip = tooltipFactory('tooltipMenu');
// export const imageTooltip = tooltipFactory("imageTooltipMenu");
// export const slash = slashFactory('slashMenu');
// export const emojiSlash = slashFactory("emojiMenu");

@Component({
  selector: 'work-ground',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdown, TopBarComponent, NgMilkdownProvider, Spinner],
  templateUrl: './work-ground.component.html',
  styleUrl: './work-ground.component.scss',
})
export class WorkGroundComponent implements OnInit {
  @ViewChild(NgMilkdownProvider, {static: true}) provider: NgMilkdownProvider;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/markdown.md', {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  editor: any = null;
  value: string;
  loading = true;

  // plugins: NgMilkdownPlugin[] = [
  //   gfm,
  //   history,
  //   prism,
  //   clipboard,
  //   cursor,
  //   enhance,
  //   [
  //     math,
  //     $view(mathBlockSchema.node, () =>
  //       this.provider.createNodeView({
  //         component: MathBlock,
  //         stopEvent: () => true,
  //       })
  //     )
  //   ],
  //   diagram,
  //   upload,
  //   $view(diagramSchema.node, () =>
  //     this.provider.createNodeView({
  //       component: Diagram,
  //       stopEvent: () => true,
  //     })
  //   ),
  //   $view(listItemSchema.node, () =>
  //     this.provider.createNodeView({component: ListItem})
  //   ),
  //   [
  //     $view(footnoteDefinitionSchema.node, () =>
  //       this.provider.createNodeView({component: FootnoteDef})
  //     ),
  //     $view(footnoteReferenceSchema.node, () =>
  //       this.provider.createNodeView({component: FootnoteRef})
  //     )
  //   ],
  //   $view(codeBlockSchema.node, () =>
  //     this.provider.createNodeView({component: CodeBlock})
  //   ),
  //   {
  //     plugin: block,
  //     config: ctx => {
  //       ctx.set(block.key, {
  //         view: this.provider.createPluginView({
  //           component: Block,
  //           inputs: {ctx}
  //         })
  //       });
  //     }
  //   },
  //   {
  //     plugin: tooltip,
  //     config: ctx => {
  //       ctx.set(tooltip.key, {
  //         view: this.provider.createPluginView({component: Tooltip})
  //       })
  //     }
  //   },
  //   {
  //     plugin: slash,
  //     config: ctx => {
  //       ctx.set(slash.key, {
  //         view: this.provider.createPluginView({component: Slash, inputs: {slash: slash}}),
  //       })
  //     }
  //   },
  //   emoji,
  //   {
  //     plugin: emojiSlash,
  //     config: ctx => {
  //       ctx.set(emojiSlash.key, {
  //         view: this.provider.createPluginView({component: EmojiMenu, inputs: {slash: emojiSlash}}),
  //       })
  //     }
  //   },
  //   {
  //     plugin: imageTooltip,
  //     config: ctx => {
  //       ctx.set(imageTooltip.key, {
  //         view: this.provider.createPluginView({component: ImageTooltip})
  //       })
  //     }
  //   },
  //   $provide(linkPlugin),
  //   $provide(this.copilotService.copilotPlugin),
  //   tableTooltip,
  //   {
  //     plugin: tableTooltipCtx,
  //     config: ctx => {
  //       ctx.set(tableTooltip.key, {
  //         view: this.provider.createPluginView({
  //           component: TableTooltip,
  //         }),
  //       })
  //     }
  //   },
  //   $provide(tableSelectorPlugin),
  //   {
  //     plugin: indent,
  //     config: ctx => {
  //       ctx.set(indentConfig.key as any, {
  //         type: 'indent',
  //         size: 4,
  //       });
  //     }
  //   },
  // ];

  onChange(markdownText: any) {
    console.log('markdown changed!', {markdownText})
  }

  config = (ctx: any) => {
    ctx.set(editorViewOptionsCtx, {
      attributes: {
        class: "prose dark:prose-invert outline-none mx-auto px-2 py-4 box-border milkdown-theme-nord editor",
        spellcheck: "false",
      },
    });

    ctx.set(blockquoteAttr.key, () => ({
      class: "border-l-4 border-nord10 pl-4 dark:border-nord8",
    }));

    ctx.set(inlineCodeAttr.key, () => ({
      class: "font-mono text-nord10 tracking-tight dark:text-nord8",
    }));
  }
}
