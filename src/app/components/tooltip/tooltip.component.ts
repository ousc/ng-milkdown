import {Component} from '@angular/core';
import {callCommand} from "@milkdown/utils"
import {toggleEmphasisCommand, toggleStrongCommand, wrapInBlockquoteCommand} from "@milkdown/preset-commonmark";
import {NgMilkdownTooltip} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {redoCommand, undoCommand} from "@milkdown/plugin-history";
import {toggleStrikethroughCommand} from "@milkdown/preset-gfm";

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  standalone: true
})
export class TooltipComponent extends NgMilkdownTooltip {
  setBold(e: MouseEvent) {
    e.preventDefault();
    this.action(callCommand(toggleStrongCommand.key));
  }

  setItalic(e: MouseEvent) {
    e.preventDefault();
    this.action(callCommand(toggleEmphasisCommand.key));
  }

  undo(e: MouseEvent) {
    e.preventDefault();
    this.action(callCommand(undoCommand.key));
  }

  redo(e: MouseEvent) {
    e.preventDefault();
    this.action(callCommand(redoCommand.key));
  }

  strikethrough(e: MouseEvent) {
    e.preventDefault()
    this.action(callCommand(toggleStrikethroughCommand.key))
  }

  quote(e: MouseEvent) {
    e.preventDefault()
    this.action(callCommand(wrapInBlockquoteCommand.key))
  }
}
