import {Component} from '@angular/core';
import {NgMilkdownTooltip} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-tooltip.directive";
import {$ctx} from "@milkdown/utils";
import {tooltipFactory, TooltipProvider} from "@milkdown/plugin-tooltip";
import {TableButton} from "./table-tooltip-button.component";
import {Else, Is, when} from "conditio";
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
          @if (!isWholeTable && !isHeading && isRow) {
              <table-tooltip-button icon="splitscreen_add" style="transform: scaleY(-1)"
                                    (onClick)="onClick('addRowBefore')" title="Add row before"/>
          }
          @if (!isWholeTable && isCol) {
              <table-tooltip-button icon="splitscreen_vertical_add" style="transform: scaleX(-1)"
                                    (onClick)="onClick('addColBefore')" title="Add column before"/>
          }
          @if ((isWholeTable || (!isHeading && isAny))) {
              <table-tooltip-button icon="delete" (onClick)="onClick('deleteSelectedCells')"
                                    title="Delete selected cells"/>
          }
          @if (!isWholeTable && isRow) {
              <table-tooltip-button icon="splitscreen_add" (onClick)="onClick('addRowAfter')" title="Add row after"/>
          }
          @if (!isWholeTable && isCol) {
              <table-tooltip-button icon="splitscreen_vertical_add" (onClick)="onClick('addColAfter')"
                                    title="Add column after"/>
              <table-tooltip-button icon="format_align_left" (onClick)="onClick('setAlignLeft')" title="Align left"/>
              <table-tooltip-button icon="format_align_center" (onClick)="onClick('setAlignCenter')"
                                    title="Align center"/>
              <table-tooltip-button icon="format_align_right" (onClick)="onClick('setAlignRight')" title="Align right"/>
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

  onClick(type: string) {
    this.tooltipProvider?.hide();
    const {slice, payload} = when(type)(
      Is("addRowBefore", {slice: addRowBeforeCommand.key}),
      Is("addColBefore", {slice: addColBeforeCommand.key}),
      Is("deleteSelectedCells", {slice: deleteSelectedCellsCommand.key}),
      Is("addRowAfter", {slice: addRowAfterCommand.key}),
      Is("addColAfter", {slice: addColAfterCommand.key}),
      Is("setAlignLeft", {slice: setAlignCommand.key, payload: "left"}),
      Is("setAlignCenter", {slice: setAlignCommand.key, payload: "center"}),
      Is("setAlignRight", {slice: setAlignCommand.key, payload: "right"}),
      Else({})
    )
    if (slice) {
      this.action((ctx) => {
        ctx.get(commandsCtx).call(slice, payload);
      });
      if(!slice.startsWith('set')){
        this.tooltipProvider?.hide();
      }
      this.action(ctx=>{
        ctx.get(editorViewCtx).focus();
      })
    }
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
