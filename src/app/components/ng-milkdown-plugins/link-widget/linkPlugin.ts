import {LinkWidgetBefore} from "./link-widget-before.component";
import {LinkWidgetAfter} from "./link-widget-after.component";
import {Plugin} from "@milkdown/prose/state";
import {DecorationSet} from "prosemirror-view";
import {$prose} from "@milkdown/utils";
import {NgMilkdownProvider} from "../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {$provide} from "../../../../../projects/ng-milkdown/src/lib/actionFactory";

export const linkPlugin = $provide((provider: NgMilkdownProvider) => {
  return $prose(
    () => {
      return new Plugin({
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr) {
            const {selection} = tr;

            const {$from, $to} = selection;
            const node = tr.doc.nodeAt(selection.from);

            const mark = node?.marks.find((mark) => mark.type.name === "link");

            if (!mark) return DecorationSet.empty;

            let markPos = {start: -1, end: -1};
            tr.doc.nodesBetween($from.start(), $to.end(), (n, pos) => {
              if (node === n) {
                markPos = {
                  start: pos,
                  end: pos + Math.max(n.textContent.length, 1),
                };

                // stop recursing if result is found
                return false;
              }
              return undefined;
            });

            const before = provider.createWidgetView({as: "span", component: LinkWidgetBefore});
            const after = provider.createWidgetView({as: "span", component: LinkWidgetAfter});
            return DecorationSet.create(tr.doc, [
              before(markPos.start),
              after(markPos.end, {
                href: mark.attrs['href'],
                title: mark.attrs['title'],
              }),
            ]);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      })
    }
  );
});
