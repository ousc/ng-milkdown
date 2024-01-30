import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {SlashPlugin, SlashProvider} from '@milkdown/plugin-slash';
import {hiddenDiv, NgMilkdown} from '../../public-api';
import {editorViewCtx, rootDOMCtx} from "@milkdown/core";
import {callCommand} from "@milkdown/utils";
import {undoCommand} from "@milkdown/plugin-history";
import {NgMilkdownPluginComp} from "./ng-milkdown-plugin.directive";

@Directive({
  selector: 'ng-milkdown-slash',
  standalone: true
})
export class NgMilkdownSlash extends NgMilkdownPluginComp implements AfterViewInit {

  constructor(override el: ElementRef) {
    super(el);
  }

  @Input() slash: SlashPlugin<any>;

  list: any[] = [];

  selected = 0;

  _opened = false;
  get opened() {
    return this._opened;
  }

  set opened(value) {
    this._opened = value;
    setTimeout(() => {
      this.action((ctx) => {
        ctx.update(this.slash.key, (spec) => ({
          ...spec,
          opened: value,
        }));
      });
    })
  }

  trigger: string | string[] = '/';

  search = "";

  removeSlash = (ctx: Ctx) => {
    // remove slash
    const view = ctx.get(editorViewCtx);
    view.dispatch(
      view.state.tr.delete(
        view.state.selection.from - 1,
        view.state.selection.from
      )
    );
  };

  onKeyDown(e: KeyboardEvent) {
    if (!this.opened) return false;
    const key = e.key;
    if (key === "ArrowDown") {
      e.preventDefault();
      this.selected = (this.selected + 1) % this.list.length;
      return false;
    }
    if (key === "ArrowUp") {
      e.preventDefault();
      this.selected = (this.selected + this.list.length - 1) % this.list.length;
      return false;
    }
    if (key === "Enter") {
      e.preventDefault();
      setTimeout(() => {
        this.action(callCommand(undoCommand.key));
        (this.provider.editor as unknown as NgMilkdown).editor?.action(this.onPick);
      });
      setTimeout(() => {
        this.action(ctx => {
          ctx.get(editorViewCtx).focus();
        })
      })
      return false;
    }
    return true;
  }

  get onPick(): (ctx: Ctx) => void {
    return ctx => void 0;
  }


  eventListener: any = null;

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.eventListener = this.onKeyDown.bind(this);
  }

  get root(): HTMLElement {
    return (this.provider.editor as unknown as NgMilkdown).editor.ctx.get(rootDOMCtx);
  }

  override get parentView() {
    return hiddenDiv();
  }

  override get pluginView() { //default pluginView
    return new SlashProvider({
      content: this.el.nativeElement,
      debounce: 50,
      trigger: this.trigger,
      tippyOptions: {
        onShow: () => {
          this.opened = true;
          this.root.addEventListener('keydown', this.eventListener);
        },
        onHide: () => {
          this.selected = 0;
          this.opened = false;
          this.root.removeEventListener('keydown', this.eventListener);
        },
      },
    }) as any;
  }
}

