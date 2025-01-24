import {
  MilkdownPlugins,
  MilkdownPluginsConfigurable,
  NgMilkdownPlugin,
  NgMilkdownPluginFactory
} from "../ng-milkdown.type";
import {MilkdownPlugin} from "@milkdown/ctx";
import {NgMilkdownProvider} from "../component/ng-milkdown-provider.component";

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
    if ((ngMilkdownPlugin as any).plugin && (ngMilkdownPlugin as any).config) {
      const {plugin, config} = ngMilkdownPlugin as unknown as MilkdownPluginsConfigurable;
      result = [...result, ...flatPlugins(plugin)];
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
