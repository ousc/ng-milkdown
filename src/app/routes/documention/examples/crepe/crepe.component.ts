import {Component, ViewEncapsulation} from "@angular/core";
import {AppService} from "../../../../app.service";
import {NgMilkdownCrepe} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {NgMilkdownProvider} from "../../../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../../../components/spinner.component";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownCrepeEditor} from "../../../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import { imageInlineComponent } from '@milkdown/kit/component/image-inline'
import {iframeComponent} from "../../../../components/milkdown-plugins/iframe.component";
import {styleUrls} from "../../../../shared/style-urls";

@Component({
  selector: 'crepe-example',
  template: `
      <div class="relative h-full overflow-auto">
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
    NgMilkdownCrepe,
    NgMilkdownProvider,
    Spinner,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls,
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
