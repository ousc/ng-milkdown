import {Directive, ElementRef, EventEmitter, Input} from "@angular/core";
import {NgProsemirrorAdapterProvider} from "../ng-prosemirror-adapter.component";
import {WidgetViewContext} from "../ngProsemirrorAdapter.type";

@Directive({
  selector: 'ng-prosemirror-widget',
  standalone: true
})
export abstract class NgProsemirrorWidget {
  @Input() public key: string;
  @Input() public provider: NgProsemirrorAdapterProvider;

  constructor(public el: ElementRef) {
  }

  get context() {
    return this.provider?.service?.widgetViewContext?.[this.key];
  }

  get view() {
    return this.provider?.service?.widgetViewContext?.[this.key]?.view;
  }

  get getPos() {
    return this.provider.service.widgetViewContext?.[this.key]?.getPos;
  }

  get spec() {
    return this.provider.service.widgetViewContext?.[this.key]?.spec;
  }

  onUpdate = new EventEmitter<WidgetViewContext>();
}
