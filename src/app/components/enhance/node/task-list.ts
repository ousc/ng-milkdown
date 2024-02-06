/* Copyright 2024, NgMilkdown by Ousc. */
import {listItemSchema} from "@milkdown/preset-commonmark";
import {$command} from "@milkdown/utils";
import {withMeta} from "../with-meta";

export const insertTaskListCommand = $command(
  'InsertTaskList',
  (ctx) => () => (state, dispatch) => {
    if (!dispatch) return true;

    const { tr } = state;

    const node = listItemSchema.type(ctx).createAndFill({ checked: false });
    if (!node) return true;

    dispatch(tr.replaceSelectionWith(node).scrollIntoView())
    return true;
  }
);
withMeta(insertTaskListCommand, {
  displayName: 'Command<insertTaskListCommand>',
  group: 'ListItem',
})

