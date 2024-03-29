import {Component} from '@angular/core';
import {commandsCtx, editorViewCtx} from "@milkdown/core";
import {
  createCodeBlockCommand,
  insertHrCommand,
  wrapInBlockquoteCommand,
  wrapInHeadingCommand
} from "@milkdown/preset-commonmark";
import {NgMilkdownSlash} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-slash.directive";
import {Ctx} from "@milkdown/ctx";
import {insertDiagramCommand} from '@milkdown/plugin-diagram';
import {createMathBlockCommand} from "../enhance";

@Component({
  selector: 'slash',
  standalone: true,
  imports: [],
  templateUrl: './slash.component.html',
  styleUrl: './slash.component.scss'
})
export class Slash extends NgMilkdownSlash {
  override list = [
    {
      label: 'Heading 1',
      icon: 'looks_one',
      slice: wrapInHeadingCommand.key,
      payload: 1,
    },
    {
      label: 'Heading 2',
      icon: 'looks_two',
      slice: wrapInHeadingCommand.key,
      payload: 2,
    },
    {
      label: 'Heading 3',
      icon: 'looks_3',
      slice: wrapInHeadingCommand.key,
      payload: 3,
    },
    {
      label: 'Quote Block',
      icon: 'format_quote',
      slice: wrapInBlockquoteCommand.key,
    },
    {
      label: 'Code Block',
      icon: 'code_blocks',
      slice: createCodeBlockCommand.key,
    },
    {
      label: 'Diagram',
      icon: 'rebase',
      slice: insertDiagramCommand.key,
    },
    {
      label: 'Math Block',
      icon: 'functions',
      slice: createMathBlockCommand.key
    },
    {
      label: 'Divider',
      icon: 'horizontal_rule',
      slice: insertHrCommand.key,
      payload: {mode: 'horizontal'},
    },
  ];

  override get onPick(): (ctx: Ctx) => void {
    const {slice, payload} = this.list[this.selected]
    setTimeout(() => {
      this.action(ctx => {
        ctx.get(editorViewCtx).focus();
      })
    })
    return (ctx: Ctx) => {
      this.removeSlash(ctx);
      ctx.get(commandsCtx).call(slice, payload);
    }
  }
}
