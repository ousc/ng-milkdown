import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {NgProsemirrorAdapterProvider} from "ng-prosemirror-adapter";
import {NgMilkdownProvider} from "./component/ng-milkdown-provider.component";

export type NgMilkdownPluginConfigAsync = Promise<(ctx: Ctx) => void>

export type NgMilkdownPluginConfigSync = ((ctx: Ctx) => void)

export type NgMilkdownPluginConfig = NgMilkdownPluginConfigAsync | NgMilkdownPluginConfigSync

export type NgMilkdownEditorConfigAsync =
  (ctx: Ctx, provider?: NgProsemirrorAdapterProvider) => Promise<void>

export type NgMilkdownEditorConfigSync =
  (ctx: Ctx, provider?: NgProsemirrorAdapterProvider) => void

export type NgMilkdownEditorConfig = NgMilkdownEditorConfigAsync | NgMilkdownEditorConfigSync

export type MilkdownPlugins = MilkdownPlugin | MilkdownPlugin[] | (MilkdownPlugin[] | MilkdownPlugin)[]

export type MilkdownPluginsConfigurable = {
  plugin: MilkdownPlugins,
  config?: NgMilkdownPluginConfig
}
export type MilkdownPluginsFactory = (provider: NgMilkdownProvider) => MilkdownPlugins

export type NgMilkdownPluginFactory = { factory: MilkdownPluginsFactory }

export type NgMilkdownPlugin = MilkdownPlugins | MilkdownPluginsConfigurable | NgMilkdownPluginFactory
