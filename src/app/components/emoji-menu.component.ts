import {Component} from '@angular/core';
import {NgMilkdownSlash} from "../../../projects/ng-milkdown/src/lib/directive/ng-milkdown-slash.directive";
import {SlashProvider} from "@milkdown/plugin-slash";
import {Ctx} from "@milkdown/ctx";
import {editorViewCtx} from "@milkdown/core";
import {gemoji} from 'gemoji';

@Component({
  selector: 'emoji-menu',
  template: `
      <ul class="m-0 w-96 list-none rounded bg-gray-50 shadow-lg ring-2 dark:bg-gray-900">
          @for (item of list;track item) {
              <li class="cursor-pointer px-6 py-3"
                  [class]="selected === $index ? ['bg-gray-200', 'dark:bg-gray-500'] : []"
                  (mousemove)="selected = $index"
                  (mousedown)="action(onPick)">
                  {{ item.emoji }} :{{ item.names[0] }}:
              </li>
          }
      </ul>
  `,
  styles: [],
  standalone: true
})
export class EmojiMenu extends NgMilkdownSlash {
  override get pluginView() {
    const emojiSearchRegexp = /:(?<search>\S+)/;
    const _this = this;
    return new SlashProvider({
      content: this.el.nativeElement,
      debounce: 50,
      trigger: this.trigger,
      shouldShow(this: SlashProvider, view) {
        const currentTextBlockContent = this.getContent(view);

        if (!currentTextBlockContent) {
          _this.search = '';
          return false;
        }

        const search = currentTextBlockContent.match(emojiSearchRegexp);
        if (!search) {
          _this.search = '';
          return false;
        }

        const text = search.groups!['search'];
        const index = gemoji.findIndex((emoji) => {
          return emoji.names.some((name) => name.includes(text));
        });

        if (index < 0) {
          _this.search = '';
          return false;
        }

        _this.search = text;
        _this.selected = 0;
        _this.list = _this.emojis;
        return true;
      },
    }) as any;
  }

  get emojis() {
    if (this.search.length === 0) return [];
    return gemoji
      .filter((emoji) => {
        return emoji.names.some((name) => name.includes(this.search));
      })
      .slice(0, 10);
  }

  override get onPick(): (ctx: Ctx) => void {
    return (ctx: Ctx) => {
      const target = this.emojis[this.selected];
      if (!target) return;
      const view = ctx.get(editorViewCtx);
      const {state} = view;
      const {selection} = state;
      view.dispatch(
        view.state.tr
          .delete(selection.from - this.search.length - 1, selection.from)
          .insertText(target.emoji)
      );
    }
  }
}
