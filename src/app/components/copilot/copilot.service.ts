import {$prose} from '@milkdown/utils';
import {Plugin, PluginKey} from '@milkdown/prose/state';
import {Decoration, DecorationSet} from "@milkdown/prose/view";
import {Ctx} from "@milkdown/ctx";
import {editorViewCtx, parserCtx, serializerCtx} from "@milkdown/core";
import {DOMSerializer, DOMParser} from "prosemirror-model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CopilotService {
  constructor(private http: HttpClient) {
  }


  initialState = {
    deco: DecorationSet.empty,
    message: '',
  }

  keyDownHandler(ctx: Ctx, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Space') {
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
  copilotPlugin = $prose((ctx) => new Plugin({
    key: this.copilotPluginKey,
    props: {
      handleKeyDown: (view, event) => {
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
        const message = tr.getMeta(this.copilotPluginKey);
        console.log(message)
        if (typeof message !== 'string') return value;

        if (message.length === 0) {
          return {...this.initialState};
        }

        const {to} = tr.selection;
        const widget = Decoration.widget(to + 1, () => this.renderHint(message));
        console.log(widget)
        return {
          deco: DecorationSet.create(state.doc, [widget]),
          message,
        };
      }
    }
  }))

  renderHint(message: string) {
    const dom = document.createElement('pre');
    dom.className = "copilot-hint"
    dom.innerHTML = message;
    console.log(dom)
    return dom;
  }

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
    this.fetchAIHint(markdown).subscribe((hint: any) => {
      const tr = view.state.tr;
      console.log({hint: hint.choices[0].text})
      console.log(tr);
      view.dispatch(tr.setMeta(this.copilotPluginKey, hint.choices[0].text))
    });
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
    return this.http.post('https://api.openai.com/v1/completions', {
      model: 'davinci',
      prompt,
      "max_tokens": 7,
      "temperature": 0,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "logprobs": null
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
