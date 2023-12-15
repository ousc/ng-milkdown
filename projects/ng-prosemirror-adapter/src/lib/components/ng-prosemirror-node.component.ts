import {AfterViewInit, Directive, ElementRef, Input} from "@angular/core";
import {NgProsemirrorAdapterProvider} from "../ng-prosemirror-adapter.component";

@Directive({
  selector: 'ng-prosemirror-node',
  standalone: true
})
export abstract class NgProsemirrorNode implements AfterViewInit {
  @Input() public key: string;
  @Input() public provider: NgProsemirrorAdapterProvider;

  constructor(public el: ElementRef) {
  }

  get context() {
    return this.provider?.service?.nodeViewContext?.[this.key];
  }

  get view() {
    return this.context?.view;
  }

  get contentRef() {
    return this.context?.contentRef;
  }

  get getPos() {
    return this.context?.getPos;
  }

  get setAttrs() {
    return this.context?.setAttrs;
  }

  get node() {
    return this.context?.node;
  }

  get selected() {
    return this.context?.selected;
  }

  get decorations() {
    return this.context?.decorations;
  }
  get innerDecorations(){
    return this.context?.innerDecorations;
  }

  get container() {
    return this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.context?.contentRef(this.container);
  }
}
