/* Copyright 2024, NgMilkdown by Ousc. */
import {$command} from '@milkdown/utils';
import {mathBlockSchema} from "@milkdown/plugin-math";
import {setBlockType} from '@milkdown/prose/commands'
import {withMeta} from "../with-meta";

/// Command for wrapping a block in a math block
export const createMathBlockCommand = $command('InsertMathBlock', ctx => () => setBlockType(mathBlockSchema.type(ctx)))

withMeta(createMathBlockCommand, {
  displayName: 'Command<insertMathBlockCommand>',
  group: 'MathBlock',
})
