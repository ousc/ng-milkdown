import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LayoutComponent} from "./routes/layout.component";
import {AppService} from "./app.service";
import {TranslocoService} from "@jsverse/transloco";

@Component({
  selector: 'app-root',
  template: `
      <ng-milkdown-layout/>
  `,
  styles:`
    .active {
      @apply text-indigo-800
    }
  `,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    LayoutComponent
  ],
  standalone: true
})
export class AppComponent {
  constructor(
    private translocoService: TranslocoService,
    private appService: AppService) {
  }
  ngOnInit(): void {
    this.translocoService.setActiveLang(this.appService.language);
  }
}
