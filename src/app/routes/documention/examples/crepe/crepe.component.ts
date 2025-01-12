import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgTemplateOutlet} from "@angular/common";
import {AppService} from "../../../../app.service";
import {TranslocoPipe} from "@jsverse/transloco";
import {NgMilkdownCrepe} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {NgMilkdownProvider} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {TopBarComponent} from "../../../../components/top-bar.component";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownCrepeEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import { imageInlineComponent } from '@milkdown/kit/component/image-inline'
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
import {iframeComponent} from "../../../../components/iframe.component";

@Component({
  selector: 'overview',
  template: `
      <div class="relative h-full">
          <div class="h-full overflow-auto overscroll-none ctn flex flex-col px-4">
              <ng-milkdown-provider>
                  <ng-milkdown-crepe
                      [(ngModel)]="value"
                      [plugins]="plugins"
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
export class CrepeComponent {
  constructor(private http: HttpClient, private appService: AppService) {
  }
  value: string = null;
  async ngOnInit(): Promise<void> {
    this.http.get(`assets/markdowns/${this.appService.language}/ng-milkdown-crepe.md`, {responseType: 'text'}).subscribe((markdown) => {
      this.value = markdown;
    });
  }

  plugins = [imageInlineComponent, iframeComponent];

  loading = true;
  beforeReady({crepe, provider}: NgMilkdownCrepeEditor) {
    crepe.setReadonly(true);
  }
}
