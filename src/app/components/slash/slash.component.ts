import {Component} from '@angular/core';
import {editorViewCtx} from "@milkdown/core";
import {callCommand} from "@milkdown/utils";
import {createCodeBlockCommand, wrapInBlockquoteCommand} from "@milkdown/preset-commonmark";
import {NgMilkdownSlash} from "../../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-slash.directive";

@Component({
  selector: 'slash',
  standalone: true,
  imports: [],
  templateUrl: './slash.component.html',
  styleUrl: './slash.component.scss'
})
export class SlashComponent extends NgMilkdownSlash {
  createCodeBlockCommand = (e: KeyboardEvent | MouseEvent) => {
    if(e instanceof KeyboardEvent) {
      this.onKeyBoardDown(e);
    }
    e.preventDefault() // Prevent the keyboad key to be inserted in the editor.
    if (e instanceof MouseEvent || e.key === 'Enter') {
      this.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const { dispatch, state } = view;
        const { tr, selection } = state;
        const { from } = selection;
        dispatch(tr.deleteRange(from - 1, from))
        view.focus()
        return callCommand(createCodeBlockCommand.key)(ctx)
      });
    }
  }

  createQuoteBlockCommand = (e: KeyboardEvent | MouseEvent) => {
    if(e instanceof KeyboardEvent) {
      this.onKeyBoardDown(e);
    }
    e.preventDefault() // Prevent the keyboad key to be inserted in the editor.
    if (e instanceof MouseEvent || e.key === 'Enter') {
      this.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const { dispatch, state } = view;
        const { tr, selection } = state;
        const { from } = selection;
        dispatch(tr.deleteRange(from - 1, from))
        view.focus()
        return callCommand(wrapInBlockquoteCommand.key)(ctx)
      });
    }
  }

  onKeyBoardDown = (e: KeyboardEvent) => {
    const getSlashMenus = () => {
      const slashMenus = this.el.nativeElement.querySelectorAll('.slash-menu');
      const currentFocus = this.el.nativeElement.querySelector('.slash-menu:focus');
      const currentFocusIndex = Array.from(slashMenus).indexOf(currentFocus);
      return {slashMenus, currentFocusIndex}
    }
    if(e.key === 'ArrowUp') {
      const {slashMenus, currentFocusIndex} = getSlashMenus();
      slashMenus[(currentFocusIndex + slashMenus.length - 1) % slashMenus.length].focus()
    }
    if(e.key === 'ArrowDown') {
      const {slashMenus, currentFocusIndex} = getSlashMenus();
      slashMenus[(currentFocusIndex + 1) % slashMenus.length].focus()
    }
    if(e.key === 'Escape') {
      this.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        view.focus()
        return false
      });
    }
  }

}
