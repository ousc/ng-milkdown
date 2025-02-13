# ![Logo](../../../assets/milkdownLogo.png "ng-milkdown") ng-milkdown-crepe 组件

> 您当前查看的文档是使用`ng-milkdown-crepe`组件渲染的。

`ng-milkdown-crepe` 是基于 🍼[milkdown](https://milkdown.dev) 的 [crepe](https://milkdown.dev/docs/guide/using-crepe)实现的[Angular](https://angular.dev/) 编辑器组件，开箱即用，且支持自定义配置。

## 代码演示

### 基本

最简单的用法，使用`ng-milkdown-crepe`组件即可，支持`[(ngModel)]`双向绑定。

::iframe{src="/#/crepe-example-basic" height="500px"}

--------------

### 主题

和`milkdown`一样，`ng-milkdown-crepe`支持自定义主题，通过import的方式引入主题样式：

```typescript
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
```

更多主题请参考[milkdown](https://milkdown.dev/docs/guide/using-crepe#theme)文档。

--------------

### 特性及特性设置

通过`features`属性和`featureOptions`属性可以设置`crepe`的特性，详细特性请参考[milkdown](https://milkdown.dev/docs/guide/using-crepe#feature-toggle-and-config)文档。

以下示例中，slash选项的文本和分组标签都增加了后缀`_1`，且关闭了`CodeMirror`特性：

::iframe{src="/#/crepe-example-feature"}

--------------

### 事件

`ng-milkdown-crepe`支持`beforeReady`及`onReady`事件，`beforeReady`事件在编辑器初始化前触发，`onReady`事件在编辑器初始化后触发。

通过`beforeReady`事件可以对编辑器进行一些初始化操作，如设置编辑器内容、设置只读等。

::iframe{src="/#/crepe-example-outputs"}

--------------

### 插件

`ng-milkdown-crepe`支持自定义插件，通过`plugins`属性传入插件数组即可。

以下示例中，引入了`imageInlineComponent`插件和`sizePlugin`插件：

::iframe{src="/#/crepe-example-plugin"}

关于`ng-milkdown`中如何创建插件，请参考[插件开发](/crepe-example-plugin)文档。

`ng-milkdown-crepe`支持所有`milkdown`原生插件，关于`milkdown`原生插件，请参考[milkdown](https://milkdown.dev/docs/plugin/using-plugins)文档。

--------------

## API

| 参数                 | 说明        | 类型                                             | 默认值          |
|--------------------|-----------|------------------------------------------------|--------------|
| `[(ngModel)]`      | 编辑器内容     | `DefaultValue`                                 | -            |
| `[features]`       | 编辑器特性     | `Partial<Record` `<CrepeFeature, boolean>` `>` | `All`        |
| `[featureOptions]` | 编辑器特性配置   | `CrepeFeatureConfig`                           | `{}`         |
| `[plugins]`        | 编辑器插件     | `NgMilkdownPlugin[]`                           | `[]`         |
| `[classList]`      | 编辑器类名     | `string[]`                                     | `[]`         |
| `(beforeReady)`    | 编辑器初始化前事件 | `NgMilkdownCrepeEditor`                        | -            |
| `(onReady)`        | 编辑器初始化后事件 | `NgMilkdownCrepeEditor`                        | -            |
| `[spinner]`        | 加载中组件     | `TemplateRef<any> \| string`                   | `loading...` |
| `[(loading)]`      | 是否加载中     | `boolean`                                      | `true`       |
