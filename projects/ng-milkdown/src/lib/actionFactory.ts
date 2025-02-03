import {NgMilkdown} from "./ng-milkdown.component";
import {Ctx, SliceType} from "@milkdown/ctx";
import {$Node, $prose} from "@milkdown/utils";
import {NgNodeViewUserOptions, NgPluginViewUserOptions, NgProsemirrorEditor} from "ng-prosemirror-adapter";
import {
  MilkdownPluginsFactory,
  NgMilkdownPluginFactory,
  NgMilkdownNodeViewFactory, NgMilkdownPluginViewFactory, NgMilkdownPlugin
} from "./ng-milkdown.type";
import type {PluginSpec} from '@milkdown/prose/state';
import {Plugin} from "@milkdown/prose/state";

export function actionFactory(editor: NgProsemirrorEditor): <T>(action: (ctx: Ctx) => T) => T {
  return (editor as unknown as NgMilkdown)?.editor?.action;
}

export function $provide(factory: MilkdownPluginsFactory): NgMilkdownPluginFactory {
  return {factory}
}

export function $nodeView($node: $Node, userOptions: NgNodeViewUserOptions): NgMilkdownNodeViewFactory {
  return {
    $node, options: userOptions, factory: (provider, options: NgNodeViewUserOptions) => provider.createNodeView(options)
  }
}


export function $pluginView($plugin: SliceType<PluginSpec<any>>, userOptions: NgPluginViewUserOptions): NgMilkdownPluginViewFactory {
  return {
    $plugin,
    options: userOptions,
    factory: (provider, options: NgPluginViewUserOptions) => provider.createPluginView(options)
  }
}


export function $prosePlugin(options: NgPluginViewUserOptions): NgMilkdownPluginFactory {
  return $provide(provider => $prose(ctx => new Plugin({view: provider.createPluginView(options)})))
}

