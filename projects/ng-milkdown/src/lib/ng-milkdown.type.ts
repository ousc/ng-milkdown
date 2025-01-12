import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {NgMilkdownProvider} from "./component/ng-milkdown-provider.component";
import {Crepe} from "@milkdown/crepe";
import {Editor} from "@milkdown/core";
import {NgProsemirrorAdapterProvider} from "ng-prosemirror-adapter/lib/ng-prosemirror-adapter.component";

export type NgMilkdownPluginConfigAsync = Promise<(ctx: Ctx) => void>

export type NgMilkdownPluginConfigSync = ((ctx: Ctx) => void)

export type NgMilkdownPluginConfig = NgMilkdownPluginConfigAsync | NgMilkdownPluginConfigSync

export type MilkdownPlugins = MilkdownPlugin | MilkdownPlugin[] | (MilkdownPlugin[] | MilkdownPlugin)[]

export type MilkdownPluginsConfigurable = {
  plugin: MilkdownPlugins,
  config?: NgMilkdownPluginConfig
}
export type MilkdownPluginsFactory = (provider: NgMilkdownProvider) => MilkdownPlugins

export type NgMilkdownPluginFactory = { factory: MilkdownPluginsFactory }

export type NgMilkdownPlugin = MilkdownPlugins | MilkdownPluginsConfigurable | NgMilkdownPluginFactory

export type NgMilkdownCrepeEditor = { crepe: Crepe, provider: NgProsemirrorAdapterProvider }

export type NgMilkdownEditor = { editor: Editor, provider: NgProsemirrorAdapterProvider }
