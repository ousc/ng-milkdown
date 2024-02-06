import {MilkdownPlugin} from "@milkdown/ctx";
import {commands} from "./composed/commands";

export * from './node';
export const enhance: MilkdownPlugin[] = [commands].flat()
