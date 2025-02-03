import { MilkdownPlugin } from "@milkdown/kit/ctx";
import { Node } from "@milkdown/kit/prose/model";
import { $node } from "@milkdown/kit/utils";

import { $remark } from "@milkdown/kit/utils";
import directive from "remark-directive";

const remarkPluginId = "Iframe";

const remarkDirective = $remark(remarkPluginId, () => directive);
const iframeNode = $node("iframe", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
    height: { default: "425px" },
  },
  parseDOM: [
    {
      tag: "iframe.iframe-plugin",
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute("src"),
        height: (dom as HTMLElement).getAttribute("height"),
      }),
    },
  ],
  toDOM: (node: Node) => [
    "div",
    { class: "iframe-plugin-container" },
    [
      "iframe",
      {
        contenteditable: false,
        class: "iframe-plugin",
        src: `${node.attrs.src}?embed=1`,
        height: node.attrs.height,
      },
      0,
    ],
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "iframe",
    runner: (state, node, type) => {
      state.addNode(type, {
        src: (node.attributes as { src: string }).src,
        height: (node.attributes as { height: string }).height
      });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "iframe",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "iframe",
        attributes: { src: node.attrs.src, height: node.attrs.height },
      });
    },
  },
}));

export const iframeComponent: MilkdownPlugin[] = [
  remarkDirective,
  iframeNode,
].flat();
