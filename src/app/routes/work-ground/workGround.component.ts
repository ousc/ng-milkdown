import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgMilkdown} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {tooltipFactory} from "@milkdown/plugin-tooltip";
import {slashFactory} from "@milkdown/plugin-slash";
import {NgMilkdownPlugin} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {footnoteDefinitionSchema, footnoteReferenceSchema, gfm} from "@milkdown/preset-gfm";
import {clipboard} from "@milkdown/plugin-clipboard";
import {prism} from "@milkdown/plugin-prism";
import {cursor} from "@milkdown/plugin-cursor";
import {block} from "@milkdown/plugin-block";
import {math, mathBlockSchema} from "@milkdown/plugin-math";
import {indent, indentConfig} from "@milkdown/plugin-indent";
import {history} from "@milkdown/plugin-history";
import {Tooltip} from "../../components/tooltip/tooltip.component";
import {Slash} from "../../components/slash/slash.component";
import {editorViewOptionsCtx} from "@milkdown/core";
import {Block} from "../../components/block.component";
import {diagram, diagramSchema} from "@milkdown/plugin-diagram";
import {emoji, emojiAttr} from "@milkdown/plugin-emoji";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {blockquoteAttr, codeBlockSchema, inlineCodeAttr, listItemSchema} from "@milkdown/preset-commonmark";
import {$view} from "@milkdown/utils";
import {Diagram} from "../../components/diagram.component";
import {ListItem} from "../../components/list-item.component";
import {FootnoteDef} from "../../components/footnote/footnote-def.component";
import {FootnoteRef} from "../../components/footnote/footnote-ref.component";
import {CodeBlock} from "../../components/code-block.component";
import {EmojiMenu} from "../../components/emoji-menu.component";
import {ImageTooltip} from "../../components/image-tooltip/image-tooltip.component";
import {linkPlugin} from "../../components/link/linkPlugin";
import {upload} from "@milkdown/plugin-upload";
import {tableSelectorPlugin} from "../../components/table-selector/tableSelectorPlugin";
import {TableTooltip, tableTooltip, tableTooltipCtx} from '../../components/table-selector/table-tooltip.component';
import {MathBlock} from "../../components/math-block.component";
import {TopBarComponent} from "../../components/top-bar.component";
import {CopilotService} from "../../components/copilot/copilot.service";
import {NgMilkdownProvider} from "../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../components/spinner.component";
import {$provide} from "../../../../projects/ng-milkdown/src/lib/actionFactory";
import {enhance} from "../../components/enhance";
import { nord } from '@milkdown/theme-nord';

export const tooltip = tooltipFactory('tooltipMenu');
export const imageTooltip = tooltipFactory("imageTooltipMenu");
export const slash = slashFactory('slashMenu');
export const emojiSlash = slashFactory("emojiMenu");

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgMilkdown, HttpClientModule, TopBarComponent, NgMilkdownProvider, Spinner],
  templateUrl: './workGround.component.html',
  styleUrl: './workGround.component.scss',
  providers: [CopilotService]
})
export class WorkGroundComponent implements OnInit {
  @ViewChild(NgMilkdownProvider, {static: true}) provider: NgMilkdownProvider;

  constructor(private http: HttpClient, private copilotService: CopilotService) {
  }

  ngOnInit(): void {
    this.http.get('assets/markdown.md', {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  editor: any = null;
  value: string;
  loading = true;

  plugins: NgMilkdownPlugin[] = [
    gfm,
    history,
    prism,
    clipboard,
    cursor,
    enhance,
    [
      math,
      $view(mathBlockSchema.node, () =>
        this.provider.createNodeView({
          component: MathBlock,
          stopEvent: () => true,
        })
      )
    ],
    diagram,
    upload,
    $view(diagramSchema.node, () =>
      this.provider.createNodeView({
        component: Diagram,
        stopEvent: () => true,
      })
    ),
    $view(listItemSchema.node, () =>
      this.provider.createNodeView({component: ListItem})
    ),
    [
      $view(footnoteDefinitionSchema.node, () =>
        this.provider.createNodeView({component: FootnoteDef})
      ),
      $view(footnoteReferenceSchema.node, () =>
        this.provider.createNodeView({component: FootnoteRef})
      )
    ],
    $view(codeBlockSchema.node, () =>
      this.provider.createNodeView({component: CodeBlock})
    ),
    {
      plugin: block,
      config: ctx => {
        ctx.set(block.key, {
          view: this.provider.createPluginView({
            component: Block,
            inputs: {ctx}
          })
        });
      }
    },
    {
      plugin: tooltip,
      config: ctx => {
        ctx.set(tooltip.key, {
          view: this.provider.createPluginView({component: Tooltip})
        })
      }
    },
    {
      plugin: slash,
      config: ctx => {
        ctx.set(slash.key, {
          view: this.provider.createPluginView({component: Slash, inputs: {slash: slash}}),
        })
      }
    },
    emoji,
    {
      plugin: emojiSlash,
      config: ctx => {
        ctx.set(emojiSlash.key, {
          view: this.provider.createPluginView({component: EmojiMenu, inputs: {slash: emojiSlash}}),
        })
      }
    },
    {
      plugin: imageTooltip,
      config: ctx => {
        ctx.set(imageTooltip.key, {
          view: this.provider.createPluginView({component: ImageTooltip})
        })
      }
    },
    $provide(linkPlugin),
    $provide(this.copilotService.copilotPlugin),
    tableTooltip,
    {
      plugin: tableTooltipCtx,
      config: ctx => {
        ctx.set(tableTooltip.key, {
          view: this.provider.createPluginView({
            component: TableTooltip,
          }),
        })
      }
    },
    $provide(tableSelectorPlugin),
    {
      plugin: indent,
      config: ctx => {
        ctx.set(indentConfig.key as any, {
          type: 'indent',
          size: 4,
        });
      }
    },
  ];

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

    ctx.set(emojiAttr.key, () => ({
      container: {},
      img: {
        class: "w-[1em] h-[1em] inline align-text-top",
      },
    }));
    nord(ctx);
  }
}
