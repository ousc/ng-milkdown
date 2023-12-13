import {Component} from '@angular/core';
import {CmdKey, commandsCtx, editorViewCtx} from "@milkdown/core";
import {
  createCodeBlockCommand,
  insertHrCommand,
  wrapInBlockquoteCommand,
  wrapInHeadingCommand
} from "@milkdown/preset-commonmark";
import {NgMilkdownSlash} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-slash.directive";
import {Ctx} from "@milkdown/ctx";
import {Is, when} from 'conditio';

@Component({
  selector: 'slash',
  standalone: true,
  imports: [],
  templateUrl: './slash.component.html',
  styleUrl: './slash.component.scss'
})
export class SlashComponent extends NgMilkdownSlash {
  override list = [
    {
      label: 'Heading 1',
      icon: 'looks_one',
    },
    {
      label: 'Heading 2',
      icon: 'looks_two',
    },
    {
      label: 'Heading 3',
      icon: 'looks_3',
    },
    {
      label: 'Code Block',
      icon: 'data_object',
    },
    {
      label: 'Quote Block',
      icon: 'format_quote',
    },
    {
      label: 'Divider',
      icon: 'horizontal_rule',
    }
  ];

  override get onPick(): (ctx: Ctx) => void {
    const callCommand = (command: CmdKey<any>, payload: any = null) => {
      return (ctx: Ctx) => {
        this.removeSlash(ctx);
        ctx.get(commandsCtx).call(command, payload);
      }
    }
    const command = when(this.selected)(
      Is(0, () => callCommand(wrapInHeadingCommand.key, 1)),
      Is(1, () => callCommand(wrapInHeadingCommand.key, 2)),
      Is(2, () => callCommand(wrapInHeadingCommand.key, 3)),
      Is(3, () => callCommand(createCodeBlockCommand.key)),
      Is(4, () => callCommand(wrapInBlockquoteCommand.key)),
      Is(5, () => callCommand(insertHrCommand.key, {mode: 'horizontal'})),
    )
    setTimeout(() => {
      this.action(ctx => {
        ctx.get(editorViewCtx).focus();
      })
    })
    return command;
  }
}
