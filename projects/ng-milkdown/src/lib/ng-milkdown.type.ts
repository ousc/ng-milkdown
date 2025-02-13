import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {NgMilkdownProvider} from "./component/ng-milkdown-provider.component";
import {Crepe} from "@milkdown/crepe";
import {Editor} from "@milkdown/core";
import {NgProsemirrorAdapterProvider} from "ng-prosemirror-adapter/lib/ng-prosemirror-adapter.component";
import {NodeViewConstructor} from "prosemirror-view";
import type { SliceType } from '@milkdown/ctx';
import {$Node} from "@milkdown/utils";
import type {PluginViewSpec} from "@prosemirror-adapter/core";
import {PluginSpec} from "@milkdown/prose/state";
import {NgNodeViewUserOptions, NgPluginViewUserOptions} from "ng-prosemirror-adapter";

export type MilkdownPlugins = MilkdownPlugin | MilkdownPlugin[] | (MilkdownPlugin[] | MilkdownPlugin)[]

export type MilkdownPluginsFactory = (provider: NgMilkdownProvider) => MilkdownPlugins

export type NgMilkdownPluginFactory = { factory: MilkdownPluginsFactory }

export type MilkdownNodeViewFactory = (provider: NgMilkdownProvider, options: NgNodeViewUserOptions) => NodeViewConstructor

export type NgMilkdownNodeViewFactory = { $node: $Node, options: NgNodeViewUserOptions, factory: MilkdownNodeViewFactory }

export type MilkdownPluginViewFactory = (provider: NgMilkdownProvider, options: NgPluginViewUserOptions) => PluginViewSpec

export type NgMilkdownPluginViewFactory = { $plugin: SliceType<PluginSpec<any>>, options: NgPluginViewUserOptions, factory: MilkdownPluginViewFactory }

export type NgMilkdownPlugin = MilkdownPlugins | NgMilkdownPluginFactory | NgMilkdownNodeViewFactory | NgMilkdownPluginViewFactory

export type NgMilkdownCrepeEditor = { crepe: Crepe, provider: NgProsemirrorAdapterProvider }

export type NgMilkdownEditor = { editor: Editor, provider: NgProsemirrorAdapterProvider }
