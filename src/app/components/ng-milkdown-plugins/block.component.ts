import {Component} from '@angular/core';
import {NgMilkdownBlock} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-block.directive";
import {editorViewCtx} from "@milkdown/core";
import {paragraphSchema} from '@milkdown/kit/preset/commonmark'
import {TextSelection} from "prosemirror-state";

@Component({
  selector: 'block',
  template: `
    <div class="flex gap-2">
      <div class="w-6  h-6 bg-slate-200 rounded hover:bg-slate-300 cursor-pointer" (click)="onDelete($event)">
        <i class="material-symbols-outlined">delete</i>
      </div>
      <div class="w-6  h-6 bg-slate-200 rounded hover:bg-slate-300 cursor-pointer" (click)="onAdd($event)">
        <i class="material-symbols-outlined">add</i>
      </div>
      <div class="w-6  h-6 bg-slate-200 rounded hover:bg-slate-300 cursor-grab">
        <i class="material-symbols-outlined">drag_indicator</i>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
      }
    `
  ]
  ,
  standalone: true
})
export class Block extends NgMilkdownBlock {
  onDelete(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const view = this.ctx.get(editorViewCtx)
    if (!view.hasFocus()) view.focus()
    const {state, dispatch} = view;
    const {from, to} = state.selection;
    if (from === to) {
      const tr = state.tr.delete(from - 1, to);
      dispatch(tr);
    } else {
      const tr = state.tr.delete(from, to);
      dispatch(tr);
    }
  }

  onAdd(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const view = this.ctx.get(editorViewCtx)
    if (!view.hasFocus()) view.focus()

    const {state, dispatch} = view;
    const {from, to} = state.selection;

    const pos = from === to ? from : to;
    let tr = state.tr.insert(pos, paragraphSchema.type(this.ctx).create())
    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos)))
    dispatch(tr.scrollIntoView())
    dispatch(tr);
  }
}
