import {Component} from '@angular/core';
import {callCommand} from "@milkdown/utils"
import {toggleEmphasisCommand, toggleStrongCommand, wrapInBlockquoteCommand} from "@milkdown/preset-commonmark";
import {NgMilkdownTooltip} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {redoCommand, undoCommand} from "@milkdown/plugin-history";
import {toggleStrikethroughCommand} from "@milkdown/preset-gfm";
import {TooltipProvider} from "@milkdown/plugin-tooltip";
import {CmdKey} from "@milkdown/core";

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  standalone: true
})
export class Tooltip extends NgMilkdownTooltip {
  buttons = [
    [
      {
        icon: 'undo',
        title: 'Undo',
        command: undoCommand.key
      },
      {
        icon: 'redo',
        title: 'Redo',
        command: redoCommand.key
      },
    ],
    [
      {
        icon: 'format_bold',
        title: 'Bold',
        command: toggleStrongCommand.key
      },
      {
        icon: 'format_italic',
        title: 'Italic',
        command: toggleEmphasisCommand.key
      },
      {
        icon: 'format_strikethrough',
        title: 'Strikethrough',
        command: toggleStrikethroughCommand.key
      },
      {
        icon: 'format_quote',
        title: 'Quote',
        command: wrapInBlockquoteCommand.key
      },
    ],
  ]

  mousedown(e: MouseEvent | TouchEvent, cmd: CmdKey<any>) {
    e.preventDefault();
    this.action(callCommand(cmd));
  }

  override get pluginView() {
    return new TooltipProvider({
      debounce: 50,
      content: this.container,
      shouldShow: (view) => {
        const {from, to} = view.state.selection;
        return from !== to && view.state.doc.nodeAt(from)?.type.name === "text";
      },
      tippyOptions: {appendTo: document.body}
    }) as any;
  }
}
