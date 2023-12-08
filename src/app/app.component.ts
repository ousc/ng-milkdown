import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgMilkdown} from "../../projects/ng-milkdown/src/lib/ng-milkdown.component";
import {tooltipFactory} from "@milkdown/plugin-tooltip";
import {slashFactory} from "@milkdown/plugin-slash";
import {NgMilkdownPlugin} from "../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {gfm} from "@milkdown/preset-gfm";
import {clipboard} from "@milkdown/plugin-clipboard";
import {prism} from "@milkdown/plugin-prism";
import {cursor} from "@milkdown/plugin-cursor";
import {block} from "@milkdown/plugin-block";
import {math} from "@milkdown/plugin-math";
import {indent, indentConfig} from "@milkdown/plugin-indent";
import {history} from "@milkdown/plugin-history";
import {TooltipComponent} from "./components/tooltip/tooltip.component";
import {SlashComponent} from "./components/slash/slash.component";
import {editorViewOptionsCtx} from "@milkdown/core";
import {BlockComponent} from "./components/block.component";
import {diagram, diagramSchema} from "@milkdown/plugin-diagram";
import {emoji, emojiAttr} from "@milkdown/plugin-emoji";
import {
  NgProsemirrorAdapterProvider
} from "../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {blockquoteAttr, inlineCodeAttr, listItemAttr, listItemSchema} from "@milkdown/preset-commonmark";
import {$view} from "@milkdown/utils";
import {Diagram} from "./components/diagram.component";
import {ListItem} from "./components/list-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgProsemirrorAdapterProvider, NgMilkdown, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(NgProsemirrorAdapterProvider, {static: true}) provider: NgProsemirrorAdapterProvider;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/markdown.md', {responseType: 'text'}).subscribe((markdown) => {
      this.text = markdown;
    });
  }

  editor: any = null;
  text: string;

  tooltip = tooltipFactory('my-tooltip')
  slash = slashFactory('my-slash')
  plugins: NgMilkdownPlugin[] = [
    gfm,
    history,
    prism,
    clipboard,
    cursor,
    math,
    emoji,
    [
      diagram,
      $view(diagramSchema.node, () =>
        this.provider.createNodeView({
          component: Diagram,
          stopEvent: () => true,
        })
      )
    ].flat(),
    $view(listItemSchema.node, () =>
      this.provider.createNodeView({ component: ListItem })
    ),
    {
      plugin: block,
      config: provider => ctx => {
        ctx.set(block.key, {
          view: provider.createPluginView({
            component: BlockComponent,
            inputs: {ctx}
          })
        });
      }
    },
    {
      plugin: indent,
      config: provider => ctx => {
        ctx.set(indentConfig.key as any, {
          type: 'space',
          size: 4,
        });
      }
    },
    {
      plugin: this.tooltip,
      config: provider => ctx => {
        ctx.set(this.tooltip.key, {
          view: provider.createPluginView({component: TooltipComponent})
        })
      }
    },
    {
      plugin: this.slash,
      config: provider => ctx => {
        ctx.set(this.slash.key, {
          view: provider.createPluginView({component: SlashComponent})
        })
      }
    }
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
      class: "border-l-4 border-nord10 pl-4 not-prose dark:border-nord8",
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
  }
}
