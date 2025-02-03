import {
  MilkdownPlugins, NgMilkdownNodeViewFactory,
  NgMilkdownPlugin,
  NgMilkdownPluginFactory, NgMilkdownPluginViewFactory
} from "../ng-milkdown.type";
import {Ctx, MilkdownPlugin} from "@milkdown/ctx";
import {$view} from "@milkdown/utils";
import {NgMilkdownProvider} from "../component/ng-milkdown-provider.component";
import {tableTooltip} from "../../../../../src/app/components/table-selector/table-tooltip.component";

export function flatPlugins(plugins: MilkdownPlugins): MilkdownPlugin[] {
  let convertedPlugins: MilkdownPlugin | MilkdownPlugin[];
  if (Array.isArray(plugins)) {
    convertedPlugins = plugins.flat(1);
  } else {
    convertedPlugins = [plugins];
  }
  return convertedPlugins;
}

export function getPlugins(plugins: NgMilkdownPlugin[], provider: NgMilkdownProvider): MilkdownPlugin[] {
  if (!plugins) return [];
  let result: MilkdownPlugin[] = [];
  for (const ngMilkdownPlugin of plugins) {
    if ((ngMilkdownPlugin as any).$plugin) {
      result = [
        ...result,
        (ctx: Ctx) => {
          const plugin = (ngMilkdownPlugin as NgMilkdownPluginViewFactory);
          plugin.options.inputs = plugin.options.inputs || {ctx};
          ctx.set(plugin.$plugin, {
              view: (ngMilkdownPlugin as NgMilkdownPluginViewFactory).factory(provider, plugin.options)
            }
          )
          ;
          return void 0;
        }
      ];
    } else if ((ngMilkdownPlugin as any).$node) {
      const plugin = (ngMilkdownPlugin as NgMilkdownNodeViewFactory);
      result = [...result, ...flatPlugins($view(plugin.$node, () => plugin.factory(provider, plugin.options)))];
    } else if ((ngMilkdownPlugin as any).factory) {
      result = [...result, ...flatPlugins((ngMilkdownPlugin as NgMilkdownPluginFactory).factory(provider))];
    } else {
      result = [...result, ...flatPlugins(ngMilkdownPlugin as MilkdownPlugins)];
    }
  }
  return result;
}


let timer: number = null;
let startTime = Date.now();

export const debounce = (fn: Function, delay = 200, ...args: any[]) => {
  let context: any = this
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    fn.call(context, args);
    timer = null
  }, delay) as any;
}

export const throttle = (func: Function, wait = 200, ...args: any[]) => {
  let curTime = Date.now();
  let remaining = wait - (curTime - startTime);
  let context: any = this;

  clearTimeout(timer);

  if (remaining <= 0) {
    func.apply(context, args);
    startTime = Date.now();
  } else {
    timer = setTimeout(func, remaining);  // 如果小于wait 保证在差值时间后执行
  }
}
