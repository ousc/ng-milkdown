import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgTemplateOutlet} from "@angular/common";
import {AppService} from "../app.service";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {NgMilkdownCrepe} from "../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {NgMilkdownProvider} from "../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../components/spinner.component";
import {TopBarComponent} from "../components/top-bar.component";
import {Crepe} from "@milkdown/crepe";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'overview',
  template: `
      <div class="relative h-full pt-10">
          <div class="h-full overflow-auto overscroll-none ctn flex flex-col px-4">
              <ng-milkdown-provider>
                  <ng-milkdown-crepe
                          [(ngModel)]="value"
                          [(loading)]="loading"
                          [spinner]="spinner"
                          (beforeReady)="beforeReady($event)"
                  />
                  <ng-template #spinner>
                      <spinner/>
                  </ng-template>
              </ng-milkdown-provider>
          </div>
      </div>

  `,
  styles: `
  .active {
    @apply text-indigo-800
  }

  .hidden {
    display: none;
  }
  `,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NgTemplateOutlet,
    TranslocoPipe,
    NgMilkdownCrepe,
    NgMilkdownProvider,
    Spinner,
    TopBarComponent,
    FormsModule
  ],
  standalone: true
})
export class OverviewComponent {
  constructor(private http: HttpClient, private appService: AppService) {
  }
  value: string = null;
  async ngOnInit(): Promise<void> {
    this.http.get(`assets/markdowns/${this.appService.language}/overview.md`, {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  loading = true;
  beforeReady(crepe: Crepe) {
    crepe.setReadonly(true);
    // crepe.editor.use(somePlugin);
  }
}
