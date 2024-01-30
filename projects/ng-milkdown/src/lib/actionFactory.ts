import {NgMilkdown} from "./ng-milkdown.component";
import {Ctx} from "@milkdown/ctx";
import {NgProsemirrorEditor} from "ng-prosemirror-adapter";
import {MilkdownPluginsFactory, NgMilkdownPluginFactory} from "./ng-milkdown.type";

export function actionFactory(editor: NgProsemirrorEditor): <T>(action: (ctx: Ctx) => T) => T{
  return (editor as unknown as NgMilkdown)?.editor?.action;
}

export function $provide(factory: MilkdownPluginsFactory): NgMilkdownPluginFactory {
  return {factory}
}
