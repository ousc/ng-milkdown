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
