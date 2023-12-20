<p align="center">
  <a href="https://ousc.github.io/ng-milkdown">
    <img src="milkdownLogo.png" width="230" style="vertical-align: middle;">
  </a>
</p>

<h1 align="center">
NG-MILKDOWN
</h1>


WYSIWYG markdown Editor 🍼 [**Milkdown**](https://github.com/Milkdown/milkdown) for [**Angular**](https://angular.dev/) out of box, only supports Angular **17**+.

## Example

You can run this example by:

```bash
git clone https://github.com/ousc/ng-milkdown.git
cd ng-milkdown
npm install
npm run start
```

## Online Demo

[https://ousc.github.io/ng-milkdown](https://ousc.github.io/ng-milkdown)

## ng-prosemirror-adapter

Angular adapter for ProseMirror, only supports Angular 17+.(now this library is not published to npm, we will publish it soon)

[https://github.com/ousc/ng-prosemirror-adapter](https://github.com/ousc/ng-prosemirror-adapter)

## Official plugins support on NgMilkdown:

- [X]  `theme-nord`**(preset)**
- [X]  `preset-commonmark`**(preset)**
- [X]  `plugin-listener`**(preset)**
- [X]  `preset-gfm`**(supported)**
- [X]  `plugin-history`**(supported)**
- [X]  `plugin-prism`**(supported)**
- [X]  `plugin-clipboard`**(supported)**
- [X]  `plugin-cursor`**(supported)**
- [X]  `plugin-math`**(supported)**
- [X]  `plugin-block`**(supported)**
- [X]  `plugin-indent`**(supported)**
- [X]  `plugin-tooltip`**(supported)**
- [X]  `plugin-slash`**(supported)**
- [X]  `plugin-diagram`**(supported)**
- [X]  `plugin-emoji`**(supported)**
- [X]  `plugin-cursor`**(supported)**
- [X]  `plugin-trailing`**(supported)**
- [X]  `plugin-upload`**(supported)**
- [X]  `plugin-collab`**(supported)**
- [ ]  `plugin-copilot`**(planned)**

usage of plugins can be found in [example](https://github.com/ousc/ng-milkdown/tree/main/src/app/components);

## Quick Start

### Install

```bash
npm install ng-milkdown
```

### Example

#### workGround.component.html
```html
<ng-prosemirror-adapter-provider>
  <ng-milkdown
    [editorConfig]="config"
    [plugins]="plugins"
    [(ngModel)]="value"
    [(loading)]="loading"
    [spinner]="spinner"
    (ngModelChange)="onChange($event)"
    (onReady)="editor = $event"
  />
</ng-prosemirror-adapter-provider>
```
#### workGround.component.ts

```typescript
@Component({...})
export class WorkGroundComponent {
  @ViewChild(NgProsemirrorAdapterProvider, {static: true}) provider: NgProsemirrorAdapterProvider;

  config = (ctx: any) => {
    ctx.set(editorViewOptionsCtx, {
      attributes: {
        class: "prose dark:prose-invert outline-none mx-auto px-2 py-4 box-border milkdown-theme-nord editor",
        spellcheck: "false",
      },
    });
  }

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
      diagram, // diagram plugin
      $view(diagramSchema.node, () =>
        this.provider.createNodeView({ // create node view for diagram node
          component: Diagram,
          stopEvent: () => true,
        })
      )
    ].flat(),
    $view(listItemSchema.node, () =>
      this.provider.createNodeView({ component: ListItem }) // create node view for list item node
    ),
    {
      plugin: block,
      config: ctx => {
        ctx.set(block.key, {
          view: this.provider.createPluginView({ // create plugin view for block plugin
            component: BlockComponent,
            inputs: {ctx}
          })
        });
      }
    },
    {
      plugin: indent,
      config: ctx => {
        ctx.set(indentConfig.key as any, { // set indent config
          type: 'space',
          size: 4,
        });
      }
    },
    {
      plugin: this.tooltip,
      config: ctx => {
        ctx.set(this.tooltip.key, {
          view: this.provider.createPluginView({component: ImageTooltipComponent}) // create plugin view for tooltip plugin
        })
      }
    },
    {
      plugin: this.slash,
      config: ctx => {
        ctx.set(this.slash.key, {
          view: this.provider.createPluginView({component: SlashComponent}) // create plugin view for slash plugin
        })
      }
    }
  ];

  value = 'Hello, World!';

  editor: Editor;

  onChange(markdownText: string) {
    console.log({markdownText});
  }
}

```

### API

| Property          | Description                                                       | Type                     | Default                |
|-------------------|-------------------------------------------------------------------|--------------------------|------------------------|
| `[classList]`     | editor element class names                                        | `string[]`               | `[]`                   |
| `[editorConfig]`  | config before Editor.create()                                     | `NgMilkdownEditorConfig` | `(ctx: Ctx) => void 0` |
| `[plugins]`       | milkdown plugin to use                                            | `NgMilkdownPlugin[]`     | `[]`                   |
| `[loading]`       | set the loading status of editor                                  | `boolean`                | `true`                 |
| `[spinner]`       | Custom spinner                                                    | `TemplateRef<any>`       | -                      |
| `[ngModel]`       | current value , double binding                                    | `DefaultValue`           | -                      |
| `(ngModelChange)` | callback when markdown change                                     | `EventEmitter<string>`   | -                      |
| `(onReady)`       | A callback function, can be executed when editor has bean created | `Editor`                 | -                      |

## OutOfBox Plugins

### ng-milkdown-tooltip

```typescript
@Component({
  template: `
      <button (click)="setBold($event)">
        Bold
      </button>
  `,
  ...
})
export class ImageTooltipComponent extends NgMilkdownTooltip{
    setBold(e: MouseEvent) {
      e.preventDefault();
      this.action(callCommand(toggleStrongCommand.key));
    }
}
```

### ng-milkdown-slash

```typescript
@Component({
  template: `
      <button
        [class]="selected === 0 ? ['selected'] : []"
        (mousemove)="selected = $index"
        (mousedown)="action(onPick)"
      >
        Code Block
      </button>
  `,
  ...
})
export class SlashComponent extends NgMilkdownSlash {
  override get onPick(): (ctx: Ctx) => void {
    return (ctx: Ctx) => {
      this.removeSlash(ctx);
      ctx.get(commandsCtx).call(createCodeBlockCommand.key);
      ctx.get(editorViewCtx).focus();
    }
  }
}
```

### ng-milkdown-block

```typescript
@Component({
  selector: 'block',
  template: `
      <div class="w-6 bg-slate-200 rounded hover:bg-slate-300 cursor-grab">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
      </div>
  `,
  styles:[],
  standalone: true
})
export class BlockComponent extends NgMilkdownBlock {}
```

More detailed examples and more plugins can be found in [example](https://github.com/ousc/ng-milkdown/tree/main/src/app/components);

## license

[MIT](./LICENSE)
