import {MilkdownPlugin} from '@milkdown/ctx'
import {
  createMathBlockCommand, insertTaskListCommand
} from '../node'

export const commands: MilkdownPlugin[] = [
  createMathBlockCommand,
  insertTaskListCommand
]
