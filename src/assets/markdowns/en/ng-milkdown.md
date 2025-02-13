# ![Logo](../../../assets/milkdownLogo.png "ng-milkdown") ng-milkdown Component

The document you are currently viewing is rendered using the `ng-milkdown` component, with the `theme-nord` theme and `codeBlock`, `listItem`, and other plugins provided by `ng-milkdown`.

The `ng-milkdown-editor` component is an Angular WYSIWYG markdown editor implemented based on 🍼[milkdown](https://milkdown.dev), ready to use out of the box.

It supports all native plugins of `milkdown`. For information about `milkdown` native plugins, please refer to the [milkdown](https://milkdown.dev/docs/plugin/using-plugins) documentation.

## Examples

### Basic

For the simplest usage, just use the `ng-milkdown` component, which supports `[(ngModel)]` bidirectional binding.

::iframe{src="/#/ng-milkdown-example-basic"}

--------------

### Events

`ng-milkdown` supports `beforeReady` and `onReady` events, the `beforeReady` event is triggered before the editor is initialized, and the `onReady` event is triggered after the editor is initialized.

::iframe{src="/#/ng-milkdown-example-outputs"}

--------------

### Use Plugins

::iframe{src="/#/ng-milkdown-example-plugin"}

--------------

## Partial ng-milkdown plugin support

> Still adapting to the latest `milkdown` plugins, including slash, diagram, emoji, etc.

### Code Block

Render code blocks using shiki.

```typescript
  plugins = [
    milkShiki,
    $nodeView(codeBlockSchema.node, {component: CodeBlock})
  ]
```

--------------

### List Item

Supports ordered, unordered lists and task lists.

```typescript
  plugins = [
    $nodeView(listItemSchema.node, {component: ListItem})
  ]
```

- Unordered List
- Unordered List
  - Unordered List
  - Unordered List

1. Ordered List
2. Ordered List
   1. Ordered List
   2. Ordered List

- [ ] Task List
- [x] Task List

--------------

### tooltip

Tooltip plugin, you can double-click the tooltip to view the Tooltip component.

```typescript
  const tooltip = tooltipFactory('text-tooltip');
  plugins = [
    tooltip,
    $pluginView(tooltip.key, {component: Tooltip}),
  ]
```
----------

### latex

Latex plugin, you can double-click the latex to view the Latex component.
`$` is an inline formula, `$$` is a block formula.

```typescript
  plugins = [
    latex
  ]
```

inline Latex: $v = \sqrt{2gh}$

block Latex:

$$
\begin{aligned}
\frac{1}{2} m v^2 &= mgh \\
v &= \sqrt{2gh}
\end{aligned}
$$

### block

When the mouse is hovered over a block-level element, a toolbar is displayed.

```typescript
  plugins = [
    $pluginView(block.key, {component: Block}),
  ]
```

--------------

### link(widget)

Link plugin, you can double-click the link to view the Link component.

`[link](https://www.baidu.com)`

```typescript
  plugins = [
    link,
    $pluginView(link.key, {component: Link}),
  ]
```

--------------

### iframe

Embed an iframe.

`::iframe{src="https://www.baidu.com"}`

```typescript
  plugins = [
    iframeComponent
  ]
```

--------------

## Theme

`ng-milkdown` supports all themes of `milkdown`. For information about `milkdown` themes, please refer to the [milkdown](https://milkdown.dev/docs/theme/using-themes) documentation.

```typescript
import '@milkdown/theme-nord/style.css';

beforeReady({editor}: NgMilkdownEditor) {
  editor.config(ctx => {
    ctx.set(blockquoteAttr.key, () => ({
      class: "border-l-4 border-nord10 pl-4 dark:border-nord8",
    }));

    ctx.set(inlineCodeAttr.key, () => ({
      class: "font-mono text-nord10 tracking-tight dark:text-nord8",
    }));
  }
}
```
--------------

## Plugin Development

ng-milkdown provides methods such as `$nodeView`, `$pluginView`, and `$prosePlugin` to bind Angular components with milkdown plugins.

For details, please refer to the [Plugin Development](/ng-milkdown-example-plugin) documentation.


## API

| Parameter          | Description                         | Type                                 | Default       |
|--------------------|-------------------------------------|--------------------------------------|---------------|
| `[(ngModel)]`      | Editor content                      | `DefaultValue`                       | -             |
| `[plugins]`        | Editor Plugins                      | `NgMilkdownPlugin[]`                 | `[]`          |
| `[classList]`      | Editor class names                  | `string[]`                           | `[]`          |
| `(beforeReady)`    | Events before editor initialization | `NgMilkdownEditor`                   | -             |
| `(onReady)`        | Events after editor initialization  | `NgMilkdownEditor`                   | -             |
| `[spinner]`        | Loading Component                   | `TemplateRef<any> \| string`         | `loading... ` |
| `[(loading)]`      | Whether or not it's loading         | `boolean`                            | `true`        |

