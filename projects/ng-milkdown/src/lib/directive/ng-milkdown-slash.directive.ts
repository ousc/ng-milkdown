import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
} from '@angular/core';
import {Ctx} from '@milkdown/ctx';
import {SlashPlugin, SlashProvider} from '@milkdown/plugin-slash';
import {NgMilkdown} from '../../public-api';
import {
  NgProsemirrorPlugin
} from "../../../../ng-prosemirror-adapter/src/lib/components/ng-prosemirror-plugin.component";
import {editorViewCtx, rootDOMCtx} from "@milkdown/core";
import {callCommand} from "@milkdown/utils";
import {undoCommand} from "@milkdown/plugin-history";

@Directive({
  selector: 'ng-milkdown-slash',
  standalone: true
})
export class NgMilkdownSlash extends NgProsemirrorPlugin implements AfterViewInit {

  constructor(override el: ElementRef, private ngZone: NgZone) {
    super(el);
  }

  @Input() slash: SlashPlugin<any>;
  action: <T>(action: (ctx: Ctx) => T) => T = (command) => {
    return (this.provider.editor as NgMilkdown).editor.action(command);
  }

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

  loading = true;

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
        (this.provider.editor as NgMilkdown).editor?.action(this.onPick);
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

  ngAfterViewInit(): void {
    this.loading = false;
    this.eventListener = this.onKeyDown.bind(this);
  }

  get root(): HTMLElement {
    return (this.provider.editor as NgMilkdown).editor.ctx.get(rootDOMCtx);
  }

  override get pluginView() { //default pluginView
    return this.provider.service.pluginView[this.key] || new SlashProvider({
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

