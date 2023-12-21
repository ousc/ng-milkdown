import {Component} from '@angular/core';
import {NgMilkdownTooltip} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {$ctx} from "@milkdown/utils";
import {tooltipFactory, TooltipProvider} from "@milkdown/plugin-tooltip";
import {TableButton} from "./table-tooltip-button.component";
import {CellSelection} from '@milkdown/prose/tables';
import {commandsCtx, editorViewCtx} from "@milkdown/core";
import {
  addColAfterCommand,
  addColBeforeCommand,
  addRowAfterCommand,
  addRowBeforeCommand,
  deleteSelectedCellsCommand,
  setAlignCommand
} from "@milkdown/preset-gfm";

export const tableTooltipCtx = $ctx<TooltipProvider | null, "tableTooltip">(
  null,
  "tableTooltip"
);
export const tableTooltip = tooltipFactory("TABLE");

@Component({
  selector: 'table-tooltip',
  template: `
      <div class="flex">
          @for (button of buttons;track $index) {
              @if (button.iif()) {
                  <table-tooltip-button [icon]="button.icon" [title]="button.title" (onClick)="onClick($index)" [style]="button.style"/>
              }
          }
      </div>
  `,
  styles: [
    `
      :host ::ng-deep table-tooltip-button:not(:first-child):not(:last-child) button {
        border-left: none;
        border-radius: 0;
      }

      :host ::ng-deep table-tooltip-button:last-child button {
        border-left: none;
        border-radius: 0 .25rem .25rem 0;
      }

      :host ::ng-deep table-tooltip-button:first-child button {
        border-radius: 0 .25rem .25rem 0;
      }
    `
  ],
  imports: [
    TableButton
  ],
  standalone: true
})
export class TableTooltip extends NgMilkdownTooltip {
  get isRow() {
    return this.state.selection instanceof CellSelection &&
      this.state.selection.isRowSelection();
  }

  get isCol() {
    return this.state.selection instanceof CellSelection &&
      this.state.selection.isColSelection();
  }

  get isWholeTable() {
    return this.isRow && this.isCol;
  }

  get isAny() {
    return this.isRow || this.isCol;
  };

  get isHeading() {
    return this.isRow &&
      this.state.doc.nodeAt((this.state.selection as CellSelection).$headCell.pos)
        ?.type.name === "table_header";
  }

  buttons = [
    {
      icon: 'splitscreen_add',
      title: 'Add row before',
      slice: addRowBeforeCommand.key,
      iif: () => !this.isWholeTable && !this.isHeading && this.isRow,
      hide: true,
      style: {
        transform: 'scaleY(-1)'
      }
    },
    {
      icon: 'splitscreen_vertical_add',
      title: 'Add column before',
      slice: addColBeforeCommand.key,
      iif: () => !this.isWholeTable && this.isCol,
      hide: true,
      style: {
        transform: 'scaleX(-1)'
      }
    },
    {
      icon: 'delete',
      title: 'Delete selected cells',
      slice: deleteSelectedCellsCommand.key,
      iif: () => this.isWholeTable || (!this.isHeading && this.isAny),
      hide: true
    },
    {
      icon: 'splitscreen_add',
      title: 'Add row after',
      slice: addRowAfterCommand.key,
      iif: () => !this.isWholeTable && this.isRow,
      hide: true
    },
    {
      icon: 'splitscreen_vertical_add',
      title: 'Add column after',
      slice: addColAfterCommand.key,
      iif: () => !this.isWholeTable && this.isCol
    },
    {
      icon: 'format_align_left',
      title: 'Align left',
      slice: setAlignCommand.key,
      payload: 'left',
      iif: () => !this.isWholeTable && this.isCol,
    },
    {
      icon: 'format_align_center',
      title: 'Align center',
      slice: setAlignCommand.key,
      payload: 'center',
      iif: () => !this.isWholeTable && this.isCol
    },
    {
      icon: 'format_align_right',
      title: 'Align right',
      slice: setAlignCommand.key,
      payload: 'right',
      iif: () => !this.isWholeTable && this.isCol
    }
  ]

  onClick(index: number) {
    const {slice, payload, hide} = this.buttons[index]
    this.tooltipProvider?.hide();
    this.action((ctx) => {
      ctx.get(commandsCtx).call(slice, payload);
    });
    if (hide) {
      this.tooltipProvider?.hide();
    }
    this.action(ctx => {
      ctx.get(editorViewCtx).focus();
    })
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.action(ctx => {
      ctx.set(tableTooltipCtx.key, this.tooltipProvider);
    });
  }

  override get pluginView() {
    return new TooltipProvider({
      content: this.container,
      tippyOptions: {
        zIndex: 30,
        appendTo: document.body,
      },
      shouldShow: () => false,
      debounce: 50,
    }) as any;
  }
}
