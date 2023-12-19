import {
  NgProsemirrorAdapterProvider
} from "../../../../projects/ng-prosemirror-adapter/src/lib/ng-prosemirror-adapter.component";
import {$prose} from "@milkdown/utils";
import {PluginKey} from "prosemirror-state";
import {Plugin} from "@milkdown/prose/state";
import {Decoration, DecorationSet} from "prosemirror-view";
import {getCellsInCol, getCellsInRow} from "@milkdown/preset-gfm";
import {TableSelectorWidget} from "./table-selector-widget.component";

export function tableSelectorPlugin(provider: NgProsemirrorAdapterProvider) {
  return $prose(() => {
    const key = new PluginKey("MILKDOWN_TABLE_SELECTOR");
    return new Plugin({
      key,
      state: {
        init() {
          return {
            decorations: DecorationSet.empty,
            pos: 0,
          };
        },
        apply(
          tr,
          value: { decorations: DecorationSet; pos: number },
          oldState,
          newState
        ) {
          const leftCells = getCellsInCol(0, tr.selection);
          if (!leftCells) return {decorations: DecorationSet.empty, pos: 0};
          const topCells = getCellsInRow(0, tr.selection);
          if (!topCells) return {decorations: DecorationSet.empty, pos: 0};

          const createWidget = provider.createWidgetView({
            as: "div",
            component: TableSelectorWidget,
          });

          const [topLeft] = leftCells;
          if (!topLeft) return {decorations: DecorationSet.empty, pos: 0};

          const decorations: Decoration[] = [];
          decorations.push(createWidget(topLeft.pos + 1, {type: "top-left"}));
          leftCells.forEach((cell, index) => {
            decorations.push(
              createWidget(cell.pos + 1, {type: "left", index})
            );
          });
          topCells.forEach((cell, index) => {
            decorations.push(
              createWidget(cell.pos + 1, {type: "top", index})
            );
          });

          if (value.pos === topLeft.pos && oldState.doc.eq(newState.doc))
            return value;

          return {
            decorations: DecorationSet.create(tr.doc, decorations),
            pos: topLeft.pos,
          };
        },
      },
      props: {
        decorations(state) {
          return key.getState(state).decorations;
        },
      },
    });
  });
}
