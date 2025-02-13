<p align="center">
  <a href="https://ousc.github.io/ng-milkdown">
    <img src="https://github.com/ousc/ng-milkdown/raw/main/milkdownLogo.png" width="230" style="vertical-align: middle;">
  </a>
</p>

<h1 align="center">
NG-MILKDOWN
</h1>

[![NPM version](https://img.shields.io/npm/v/ng-milkdown.svg)](https://www.npmjs.com/package/ng-milkdown)

WYSIWYG markdown Editor 🍼 [**Milkdown**](https://github.com/Milkdown/milkdown) for [**Angular**](https://angular.dev/) out of box, only supports Angular **17**+.
Allow you to use native Angular components to create nodeView/pluginView/widgetView, and provide corresponding examples.

## Version
`ng-milkdown` is only supported by `Angular` version `>=17.0.0`.

`ng-milkdown-crepe` only supports `Angular` version `>=18.0.0`.

| Angular | ng-milkdown |
|---------|-------------|
| 17.0.0+ | 0.0.3       |
| 18.0.0+ | 0.1.0-beta0 |


## Example

You can run this example by:

```bash
git clone https://github.com/ousc/ng-milkdown.git
cd ng-milkdown
npm install
npm run start
```

## Online Demo And Documentation

[https://ousc.github.io/ng-milkdown](https://ousc.github.io/ng-milkdown)

## ng-prosemirror-adapter(Latest Version 0.0.9)

Angular adapter for ProseMirror, only supports Angular 17+.

[https://github.com/ousc/ng-prosemirror-adapter](https://github.com/ousc/ng-prosemirror-adapter)

## Official plugins support on NgMilkdown:

- [X]  `theme-nord`**(preset)**
- [X]  `preset-commonmark`**(preset)**
- [X]  `plugin-listener`**(preset)**
- [X]  `preset-gfm`**(supported)**
- [X]  `plugin-history`**(supported)**
- [X]  `plugin-shiki`**(supported)**
- [X]  `plugin-clipboard`**(supported)**
- [X]  `plugin-cursor`**(supported)**
- [X]  `plugin-latex`**(supported)**
- [X]  `plugin-block`**(supported)**
- [X]  `plugin-indent`**(supported)**
- [X]  `plugin-tooltip`**(supported)**
- [ ]  `plugin-slash`**(working)**
- [ ]  `plugin-diagram`**(working)**
- [ ]  `plugin-emoji`**(working)**
- [X]  `plugin-cursor`**(supported)**
- [X]  `plugin-trailing`**(supported)**
- [X]  `plugin-upload`**(supported)**
- [ ]  `plugin-collab`**(working)**
- [ ]  `plugin-copilot`**(working)**

usage of plugins can be found in [example](https://github.com/ousc/ng-milkdown/tree/main/src/app/components);

## Quick Start

### Install

```bash
npm install ng-milkdown -S
```

### Crepe
#### crepe-editor.component.html
```html
<ng-milkdown-provider>
  <ng-milkdown-crepe
    [(ngModel)]="value"
    [plugins]="plugins"
    [features]="features"
    [featureConfigs]="featureConfigs"
    [(loading)]="loading"
    [spinner]="spinner"
    (beforeReady)="beforeReady($event)"
    (ngModelChange)="onChange($event)"
  />
</ng-milkdown-provider>
```

#### crepe-editor.component.ts

```typescript
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
import {NgMilkdownCrepeEditor} from "./ng-milkdown.type";

@Component({...})
export class CrepeEditorComponent {
  features = {
    [Crepe.Feature.Placeholder]: false
  }
  
  beforeReady({crepe}: NgMilkdownCrepeEditor) {
    editor.config(ctx => {
      ctx.set(blockquoteAttr.key, () => ({
        class: "border-l-4 border-nord10 pl-4 dark:border-nord8",
      }));

      ctx.set(inlineCodeAttr.key, () => ({
        class: "font-mono text-nord10 tracking-tight dark:text-nord8",
      }));
    });
  }

  plugins = [imageInlineComponent];

  value = 'Hello, World!';

  onChange(markdownText: string) {
    console.log({markdownText});
  }
}

```
### Milkdown Editor
#### editor.component.html
```html
<ng-milkdown-provider>
  <ng-milkdown
    [(ngModel)]="value"
    [plugins]="plugins"
    [(loading)]="loading"
    [spinner]="spinner"
    (beforeReady)="beforeReady($event)"
    (ngModelChange)="onChange($event)"
  />
</ng-milkdown-provider>
```

#### editor.component.ts

```typescript

const tooltip = tooltipFactory('text-tooltip')

@Component({...})
export class WorkGroundComponent {
  @ViewChild(NgMilkdownProvider, {static: true}) provider: NgMilkdownProvider;

  beforeReady({editor}: NgMilkdownEditor) {
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

  plugins = [
    commonmark,
    link,
    history,
    imageInlineComponent,
    iframeComponent,
    trailing,
    block,
    indent,
    milkShiki,
    $nodeView(codeBlockSchema.node, {component: CodeBlock}),
    $pluginView(block.key, {component: Block}),
    $nodeView(listItemSchema.node, {component: ListItem}),
    tooltip,
    $pluginView(tooltip.key, {component: Tooltip}),
    $prosePlugin({component: Size}),
    latex,
  ];

  value = 'Hello, World!';

  onChange(markdownText: string) {
    console.log({markdownText});
  }
}

```

### API

| Property          | Description                                                       | Type                      | Default                |
|-------------------|-------------------------------------------------------------------|---------------------------|------------------------|
| `[classList]`     | editor element class names                                        | `string[]`                | `[]`                   |
| `[plugins]`       | milkdown plugin to use                                            | `NgMilkdownPlugin[]`      | `[]`                   |
| `[editor]`        | pass in a fully controlled editor object                          | `(HTMLElement) => Editor` | -                      |
| `[loading]`       | set the loading status of editor                                  | `boolean`                 | `true`                 |
| `[spinner]`       | custom spinner                                                    | `TemplateRef<any>`        | -                      |
| `[ngModel]`       | current value , double binding                                    | `DefaultValue`            | -                      |
| `(ngModelChange)` | callback when markdown change                                     | `EventEmitter<string>`    | -                      |
| `(onReady)`       | A callback function, can be executed when editor has bean created | `Editor`                  | -                      |

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
export class ImageTooltipComponent extends NgMilkdownTooltip {
    setBold(e: MouseEvent) {
      e.preventDefault();
      this.action(callCommand(toggleStrongCommand.key));
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
