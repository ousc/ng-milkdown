import {Component, ViewEncapsulation} from "@angular/core";
import {AppService} from "../../app.service";
import {NgMilkdownCrepe} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown-crepe.component";
import {NgMilkdownProvider} from "../../../../projects/ng-milkdown/src/lib/component/ng-milkdown-provider.component";
import {Spinner} from "../../components/spinner.component";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgMilkdownCrepeEditor} from "../../../../projects/ng-milkdown/src/lib/ng-milkdown.type";
import {imageInlineComponent} from '@milkdown/kit/component/image-inline'

@Component({
  selector: 'overview-page',
  template: `
    <div class="relative h-full pt-10">
      <div class="nord h-full overflow-auto overscroll-none ctn flex flex-col px-4">
        <ng-milkdown-provider>
          <ng-milkdown-crepe
            [(ngModel)]="value"
            [plugins]="plugins"
            [features]="features"
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
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: [
    "../../../styles.scss",
    "../../../../node_modules/@milkdown/crepe/lib/theme/common/style.css",
    "../../../../node_modules/@milkdown/crepe/lib/theme/crepe/style.css"
  ],
  styles: `
    .active {
      @apply text-indigo-800
    }

    .hidden {
      display: none;
    }
  `,
  imports: [
    NgMilkdownCrepe,
    NgMilkdownProvider,
    Spinner,
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

  plugins = [imageInlineComponent];

  loading = true;

  beforeReady({crepe, provider}: NgMilkdownCrepeEditor) {
    // crepe.setReadonly(true);
  }

  features = {}
}
