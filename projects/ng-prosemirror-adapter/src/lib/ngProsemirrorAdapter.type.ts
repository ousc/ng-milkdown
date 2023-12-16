import {ComponentRef, Type} from "@angular/core";
import type {Attrs, Node} from 'prosemirror-model'
import {Decoration, DecorationSource, EditorView, NodeViewConstructor} from "prosemirror-view";
import type {EditorState} from "prosemirror-state";
import type {
  PluginViewSpec,
  WidgetDecorationFactory,
  WidgetDecorationSpec
} from "@prosemirror-adapter/core";
import {NgProsemirrorNode} from "./components/ng-prosemirror-node.component";
import {NgProsemirrorPlugin} from "./components/ng-prosemirror-plugin.component";
import {NgProsemirrorWidget} from "./components/ng-prosemirror-widget.component";


export type NgEditorViewComponent = ComponentRef<any>
export type NgNodeViewUserOptions = {
  component: Type<NgProsemirrorNode> // The component that will be used to render the node view.
  as?: string | HTMLElement // The element that will be used to render the node view.
  contentAs?: string | HTMLElement // The element that will be used to render the node view's content.
  update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean | void // A function that is called when the node view is updated. It takes the node, decorations, and innerDecorations as arguments.
  ignoreMutation?: (mutation: MutationRecord) => boolean | void // A function that is called when a mutation occurs on the node view's content. It takes a MutationRecord object as an argument.
  selectNode?: () => void // A function that is called when the node view is selected.
  deselectNode?: () => void // A function that is called when the node view is deselected.
  setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void // A function that is called when the node view's content is selected. It takes the anchor and head positions and the root element as arguments.
  stopEvent?: (event: Event) => boolean // A function that is called when an event occurs on the node view. It takes an Event object as an argument.
  destroy?: () => void // A function that is called when the node view is destroyed.

  // Additional
  onUpdate?: () => void // A function that is called when the node view is updated.
  inputs?: { // An object containing the inputs that will be passed to the node view component.
    [key: string]: any
  },
  key?: string // A string that is used to identify the node view.
}

export type NodeViewFactory = (options: NgNodeViewUserOptions) => NodeViewConstructor

export type NodeViewContentRef = (node: HTMLElement | null) => void

export interface NodeViewContext {
  // won't change
  // A reference to the content of the NodeView. This is a function that takes a node (HTMLElement or null) as an argument.
  contentRef: NodeViewContentRef
  // An instance of EditorView. This represents the editor's view.
  view: EditorView
  // A function that returns the position of the node in the document. If the node is not found, it returns undefined.
  getPos: () => number | undefined
  // A function that sets the attributes of the node. It takes an Attrs object as an argument.
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  // The ProseMirror Node that the NodeView is displaying.
  node: Node
  // A boolean indicating whether the node is selected.
  selected: boolean
  // An array of decorations that are active on the node.
  decorations: readonly Decoration[]
  // A DecorationSource object that contains decorations that are active on the node's content.
  innerDecorations: DecorationSource
}

export type NgPluginViewUserOptions = {
  // The component that will be used to render the plugin view.
  component: Type<NgProsemirrorPlugin>
  // A function that takes the root DOM element of the plugin view and returns the root DOM element of the plugin view.
  root?: (viewDOM: HTMLElement) => HTMLElement
  // A function that is called when the plugin view is updated. It takes the editor's view and the previous state as arguments.
  update?: (view: EditorView, prevState: EditorState) => void
  // A function that is called when the plugin view is destroyed.
  destroy?: () => void,
  // An object containing the inputs that will be passed to the plugin view component.
  inputs?: {
    [key: string]: any
  },
  // A string that is used to identify the plugin view.
  key?: string
}

export type PluginViewFactory = (options: NgPluginViewUserOptions) => PluginViewSpec

export interface PluginViewContext {
  // An instance of EditorView. This represents the editor's view.
  view: EditorView
  // The previous state of the editor.
  prevState: EditorState
}

export type NgWidgetUserOptions = {
  // The element that will be used to render the widget.
  as: string | HTMLElement
  // The component that will be used to render the widget.
  component: Type<NgProsemirrorWidget>,
  // An object containing the inputs that will be passed to the widget component.
  inputs?: {
    [key: string]: any
  },
  // A string that is used to identify the widget.
  key?: string
}

export type WidgetViewFactory = (options: NgWidgetUserOptions) => WidgetDecorationFactory

export interface WidgetViewContext {
  // An instance of EditorView. This represents the editor's view.
  view: EditorView
  // A function that returns the position of the node in the document. If the node is not found, it returns undefined.
  getPos: () => number | undefined
  // A WidgetDecorationSpec object that contains the widget's spec.
  spec?: WidgetDecorationSpec
}
