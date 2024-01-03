import {NgMilkdown} from "./ng-milkdown.component";
import {Ctx} from "@milkdown/ctx";
import {NgProsemirrorEditor} from "ng-prosemirror-adapter";

export function actionFactory(editor: NgProsemirrorEditor): <T>(action: (ctx: Ctx) => T) => T{
  return (editor as NgMilkdown).editor.action;
}
