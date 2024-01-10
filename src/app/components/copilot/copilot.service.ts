import {$prose} from '@milkdown/utils';
import {Plugin, PluginKey} from '@milkdown/prose/state';
import {DecorationSet} from "@milkdown/prose/view";
import {Ctx} from "@milkdown/ctx";
import {editorViewCtx, parserCtx, serializerCtx} from "@milkdown/core";
import {DOMParser, DOMSerializer} from "prosemirror-model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownProvider} from "../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {CopilotWidget} from "./copilot-widget.component";
import {throttle} from "../../shared/debounce_throttle";

@Injectable()
export class CopilotService {
  constructor(private http: HttpClient) {
  }

  enabled = false;

  initialState = {
    deco: DecorationSet.empty,
    message: '',
  }

  keyDownHandler(ctx: Ctx, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Space' || event.code === 'Backspace' || event.code === 'Delete') {
      this.getHint(ctx)
      return;
    }
    if (event.key === "Tab") {
      // prevent the browser from focusing on the next element.
      event.preventDefault();
      this.applyHint(ctx);
      return;
    }

    this.hideHint(ctx);
  }

  copilotPluginKey = new PluginKey('milkdown-copilot');
  copilotPlugin = (provider: NgMilkdownProvider) => $prose((ctx) => new Plugin({
    key: this.copilotPluginKey,
    props: {
      handleKeyDown: (view, event) => {
        if (!this.enabled) return;
        this.keyDownHandler(ctx, event);
      },
      decorations:(state)=> {
        return this.copilotPluginKey.getState(state).deco;
      }
    },
    state: {
      init:()=> {
        return {...this.initialState};
      },
      apply:(tr, value, _prevState, state)=> {
        if (!this.enabled) return value;
        const message = tr.getMeta(this.copilotPluginKey);
        if (typeof message !== 'string') return value;

        if (message.length === 0) {
          return {...this.initialState};
        }

        const {to} = tr.selection;
        const hint = provider.createWidgetView({as: "span", component: CopilotWidget});
        return {
          deco: DecorationSet.create(tr.doc, [
            hint(to, {message}),
          ]),
          message
        };
      }
    }
  }))

  getHint(ctx: Ctx) {
    const view = ctx.get(editorViewCtx);
    const {state} = view;
    const {tr, schema} = state;
    const {from} = tr.selection;

    const slice = tr.doc.slice(0, from)
    const serializer = ctx.get(serializerCtx);
    const doc = schema.topNodeType.createAndFill(undefined, slice.content);
    if (!doc) return;

    const markdown = serializer(doc);
    throttle(() => {
      this.fetchAIHint(markdown).subscribe((hint: any) => {
        const tr = view.state.tr;
        view.dispatch(tr.setMeta(this.copilotPluginKey, hint.choices[0].text))
      });
    }, 2000);
  }

  applyHint(ctx: Ctx) {
    const view = ctx.get(editorViewCtx);
    const {state} = view;
    const {tr, schema} = state;

    const {message} = this.copilotPluginKey.getState(state);
    const parser = ctx.get(parserCtx);
    const slice = parser(message);
    const dom = DOMSerializer.fromSchema(schema).serializeFragment(slice.content);
    const node = DOMParser.fromSchema(schema).parseSlice(dom);

    // Reset the hint since it's applied
    tr.setMeta(this.copilotPluginKey, '')
      // Replace the selection with the hint
      .replaceSelection(node)

    view.dispatch(tr);
  }

  hideHint(ctx: Ctx) {
    const view = ctx.get(editorViewCtx);
    const {state} = view;
    const {tr} = state;
    view.dispatch(tr.setMeta(this.copilotPluginKey, ''))
  }

  fetchAIHint(prompt: string) {
    const config = JSON.parse(localStorage.getItem('openai-api-config') ?? "{}"); // '{"model":"davinci-002","max_tokens":7,"temperature":0,"top_p":1,"n":1,"stream":false,"logprobs":null}'
    const url = localStorage.getItem('openai-api-url');
    const token = localStorage.getItem('openai-api-token');
    return this.http.post(url, {
      ...config,
      prompt
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}
