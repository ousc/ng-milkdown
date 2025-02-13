# ![Logo](./assets/milkdownLogo.png "ng-milkdown") ng-milkdown 组件

> 您当前查看的文档是使用`ng-milkdown`组件渲染的，使用了`theme-nord`主题和`ng-milkdown`提供的`codeBlock`、`listItem`等插件。

`ng-milkdown-editor`组件是基于 🍼[milkdown](https://milkdown.dev) 实现的[Angular](https://angular.dev/) WYSIWYG markdown 编辑器，开箱即用。

支持`milkdown`的所有原生插件，关于`milkdown`原生插件，请参考[milkdown](https://milkdown.dev/docs/plugin/using-plugins)文档。

## 代码演示

### 基本

最简单的用法，使用`ng-milkdown`组件即可，支持`[(ngModel)]`双向绑定。

::iframe{src="/#/ng-milkdown-example-basic"}

--------------

### 事件

`ng-milkdown`支持`beforeReady`及`onReady`事件，`beforeReady`事件在编辑器初始化前触发，`onReady`事件在编辑器初始化后触发。

::iframe{src="/#/ng-milkdown-example-outputs"}

--------------

### 使用插件

::iframe{src="/#/ng-milkdown-example-plugin"}

--------------

## 部分ng-milkdown插件(plugins)支持

> 仍在适配最新的`milkdown`插件，包括slash、diagram、emoji等。

### 代码块

使用shiki渲染代码块。

```typescript
  plugins = [
    milkShiki,
    $nodeView(codeBlockSchema.node, {component: CodeBlock})
  ]
```

--------------

### 列表

支持有序列表和无序列表。

```typescript
  plugins = [
    $nodeView(listItemSchema.node, {component: ListItem})
  ]
```

- 无序列表
- 无序列表
  - 无序列表
  - 无序列表

1. 有序列表
2. 有序列表
   1. 有序列表
   2. 有序列表

- [ ] 任务列表
- [x] 任务列表

--------------

### tooltip

tooltip插件，您可以双击文本查看tooltip。

```typescript
  const tooltip = tooltipFactory('text-tooltip');
  plugins = [
    tooltip,
    $pluginView(tooltip.key, {component: Tooltip}),
  ]
```
----------

### latex

支持`$`和`$$`包裹的latex公式。

`$`为行内公式，`$$`为块级公式。

```typescript
  plugins = [
    latex
  ]
```

行内公式：$E=mc^2$

块级公式：

$$
\begin{aligned}
\frac{1}{2} m v^2 &= mgh \\
v &= \sqrt{2gh}
\end{aligned}
$$

### block

将鼠标悬停在块级元素上时，显示一个工具栏。

```typescript
  plugins = [
    $pluginView(block.key, {component: Block}),
  ]
```

--------------

### link(widget)

链接插件，您可以双击链接查看Link组件。
`[link](https://www.baidu.com)`

```typescript
  plugins = [
    link,
    $pluginView(link.key, {component: Link}),
  ]
```

--------------

### iframe

iframe插件，您可以双击iframe查看Iframe组件。
`::iframe{src="https://www.baidu.com"}`

```typescript
  plugins = [
    iframeComponent
  ]
```

--------------

## 主题

`ng-milkdown`支持`milkdown`的所有主题，关于`milkdown`主题，请参考[milkdown](https://milkdown.dev/docs/theme/using-themes)文档。

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

## 插件开发

ng-milkdown提供了`$nodeView`、`$pluginView`、`$prosePlugin`等方法，用于将Angular组件与milkdown插件进行绑定。

详情请参考[插件开发](/ng-milkdown-example-plugin)文档。

--------------
## API

| 参数                 | 说明        | 类型                                             | 默认值          |
|--------------------|-----------|------------------------------------------------|--------------|
| `[(ngModel)]`      | 编辑器内容     | `DefaultValue`                                 | -            |
| `[plugins]`        | 编辑器插件     | `NgMilkdownPlugin[]`                           | `[]`         |
| `[classList]`      | 编辑器类名     | `string[]`                                     | `[]`         |
| `(beforeReady)`    | 编辑器初始化前事件 | `NgMilkdownEditor`                        | -            |
| `(onReady)`        | 编辑器初始化后事件 | `NgMilkdownEditor`                        | -            |
| `[spinner]`        | 加载中组件     | `TemplateRef<any> \| string`                   | `loading...` |
| `[(loading)]`      | 是否加载中     | `boolean`                                      | `true`       |

