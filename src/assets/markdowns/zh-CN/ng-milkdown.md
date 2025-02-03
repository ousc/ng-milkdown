# ![Logo](../../../assets/milkdownLogo.png "ng-milkdown") ng-milkdown 组件

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
