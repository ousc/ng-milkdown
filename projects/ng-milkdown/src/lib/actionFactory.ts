import {
  NgProsemirrorEditor
} from "../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-editor.component";
import {NgMilkdown} from "./ng-milkdown.component";
import {Ctx} from "@milkdown/ctx";

export function actionFactory(editor: NgProsemirrorEditor): <T>(action: (ctx: Ctx) => T) => T{
  return (editor as NgMilkdown).editor.action;
}
