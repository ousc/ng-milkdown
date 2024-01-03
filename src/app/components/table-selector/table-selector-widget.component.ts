import {Component} from '@angular/core';
import {actionFactory} from "../../../../projects/ng-milkdown/src/lib/actionFactory";
import {tableTooltipCtx} from "./table-tooltip.component";
import {commandsCtx} from "@milkdown/core";
import {
  moveColCommand,
  moveRowCommand,
  selectColCommand,
  selectRowCommand,
  selectTableCommand
} from "@milkdown/preset-gfm";
import {Else, Is, when} from 'conditio';
import {NgMilkdownWidget} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-widget.directive";

@Component({
  selector: 'table-select-widget',
  template: `
      <div [id]="key" [draggable]="type !== 'top-left'"
           class="hover:bg-nord8 hover:dark:bg-nord9 absolute cursor-pointer bg-gray-200 dark:bg-gray-600"
           [class]="
             when(type)(
                is('left', ['w-2', 'h-full', '-left-3.5', 'top-0']),
                is('top', ['right-px', 'h-2', 'left-0', '-top-3.5']),
                is('top-left', ['h-3', 'w-3', '-left-4', '-top-4', 'rounded-full']),
                Else([])
             )
           "
           [class.ring-2]="dragOver"
           (click)="onClick($event)"
           (dragstart)="onDragStart($event)"
           (dragover)="onDragOver($event)"
           (dragleave)="dragOver = false"
           (drop)="onDrop($event)"
      ></div>
  `,
  styles: [],
  standalone: true
})
export class TableSelectorWidget extends NgMilkdownWidget {
  get type(): string {
    return this.context?.spec?.type;
  }

  get index() {
    return this.context?.spec?.index || 0;
  }

  onClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation();
    this.action((ctx) => {
      const commands = ctx.get(commandsCtx);

      if (this.type === "left") commands.call(selectRowCommand.key, this.index);
      else if (this.type === "top") commands.call(selectColCommand.key, this.index);
      else commands.call(selectTableCommand.key);
      const bcr = (e.target as HTMLElement).getBoundingClientRect();
      const tooltip = ctx.get(tableTooltipCtx.key);
      tooltip.getInstance().props.getReferenceClientRect = () => {
        return bcr;
      };
      setTimeout(() => {
        tooltip.show();
      }, 50);
    });
  }

  onDragStart(e: DragEvent) {
    e.stopPropagation();

    const data = {index: this.index, type: this.type};
    e.dataTransfer.setData(
      "application/milkdown-table-sort",
      JSON.stringify(data)
    );
    e.dataTransfer.effectAllowed = "move";
  }

  dragOver = false;

  onDragOver(e: DragEvent) {
    this.dragOver = true;
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  onDrop(e: DragEvent) {
    this.dragOver = false;
    e.stopPropagation();
    e.preventDefault();
    const i = this.context.spec?.index;
    const data = e.dataTransfer.getData("application/milkdown-table-sort");
    try {
      const {index, type} = JSON.parse(data);

      this.action((ctx) => {
        const commands = ctx.get(commandsCtx);
        const options = {
          from: Number(index),
          to: i,
        };

        commands.call(
          type === "left" ? moveRowCommand.key : moveColCommand.key,
          options
        );
      });
    } catch {
      // ignore data from other source
    }
  }

  when = when;
  is = Is;
  Else = Else;
}
