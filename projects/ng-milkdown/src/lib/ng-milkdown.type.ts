import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {NgProsemirrorAdapterProvider} from "../../../ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";

export type NgMilkdownPluginConfigAsync = Promise<(ctx: Ctx) => void>

export type NgMilkdownPluginConfigSync = ((ctx: Ctx) => void)

export type NgMilkdownPluginConfig = NgMilkdownPluginConfigAsync | NgMilkdownPluginConfigSync

export type NgMilkdownEditorConfigAsync =
  (ctx: Ctx, provider?: NgProsemirrorAdapterProvider) => Promise<void>

export type NgMilkdownEditorConfigSync =
  (ctx: Ctx, provider?: NgProsemirrorAdapterProvider) => void

export type NgMilkdownEditorConfig = NgMilkdownEditorConfigAsync | NgMilkdownEditorConfigSync

export type NgMilkdownPlugin = (MilkdownPlugin | MilkdownPlugin[] | (MilkdownPlugin[] | MilkdownPlugin)[] ) |
  { plugin: (MilkdownPlugin | MilkdownPlugin[]), config: NgMilkdownPluginConfig }
