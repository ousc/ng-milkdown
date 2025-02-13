# ![Logo](../../../assets/milkdownLogo.png "ng-milkdown") ng-milkdown-crepe component

> The document you are currently viewing is rendered using the `ng-milkdown-crepe` component.

`ng-milkdown-crepe` is based on 🍼[milkdown](https://milkdown.dev)'s [crepe](https://milkdown.dev/docs/guide/using-crepe) implementation of [ Angular](https://angular.dev/) editor component that works out-of-the-box and supports custom configurations.

## Examples

### Basic

For the simplest usage, just use the `ng-milkdown-crepe` component, which supports `[(ngModel)]` bidirectional binding.

::iframe{src="/#/crepe-example-basic"}

--------------

### Theme

Like `milkdown`, `ng-milkdown-crepe` supports custom themes by importing theme styles:

```typescript
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
```

See the [milkdown](https://milkdown.dev/docs/guide/using-crepe#theme) documentation for more themes.

--------------

### Features and feature settings

You can set the characteristics of `crepe` through the `features` attribute and `featureOptions` attribute, please refer to the [milkdown](https://milkdown.dev/docs/guide/using-crepe#feature-toggle-and- config) for details.
In the following example, the suffix `_1` is added to the text and grouping labels of the slash option, and the `CodeMirror` feature is disabled:

::iframe{src="/#/crepe-example-feature"}

--------------

### Events

`ng-milkdown-crepe` supports `beforeReady` and `onReady` events, the `beforeReady` event is triggered before the editor is initialized, and the `onReady` event is triggered after the editor is initialized.
The `beforeReady` event allows you to perform some initialization operations on the editor, such as setting the editor content, setting read-only, etc.

::iframe{src="/#/crepe-example-outputs"}

--------------

### Plugin

`ng-milkdown-crepe` supports custom plugins, just pass an array of plugins via the `plugins` attribute.
The following example introduces the `imageInlineComponent` plugin and the `sizePlugin` plugin:

::iframe{src="/#/crepe-example-plugin"}

For more information on how plugins are created in `ng-milkdown`, please refer to the [plugin development](/crepe-example-plugin) documentation.
`ng-milkdown-crepe` supports all `milkdown` native plugins, for `milkdown` native plugins, please refer to the [milkdown](https://milkdown.dev/docs/plugin/using-plugins) documentation.

--------------

## API

| Parameter          | Description                         | Type                                           | Default       |
|--------------------|-------------------------------------|------------------------------------------------|---------------|
| `[(ngModel)]`      | Editor content                      | `DefaultValue`                                 | -             |
| `[features]`       | Editor Features                     | `Partial<Record` `<CrepeFeature, boolean>` `>` | `All`         |
| `[featureOptions]` | Editor Feature Configuration        | `CrepeFeatureConfig`                           | `{}`          |
| `[plugins]`        | Editor Plugins                      | `NgMilkdownPlugin[]`                           | `[]`          |
| `[classList]`      | Editor class names                  | `string[]`                                     | `[]`          |
| `(beforeReady)`    | Events before editor initialization | `NgMilkdownCrepeEditor`                        | -             |
| `(onReady)`        | Events after editor initialization  | `NgMilkdownCrepeEditor`                        | -             |
| `[spinner]`        | Loading Component                   | `TemplateRef<any> \| string`                   | `loading... ` |
| `[(loading)]`      | Whether or not it's loading         | `boolean`                                      | `true`        |
