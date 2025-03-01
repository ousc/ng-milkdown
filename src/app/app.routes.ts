import {Routes} from '@angular/router';
import {OverviewComponent} from "./routes/documention/overview.component";
import {CrepeComponent} from "./routes/documention/examples/crepe/crepe.component";
import {CrepeExampleBasicComponent} from "./routes/documention/examples/crepe/crepe-example-basic.component";
import {CrepeExampleFeatureComponent} from "./routes/documention/examples/crepe/crepe-example-feature.component";
import {CrepeExampleOutputsComponent} from "./routes/documention/examples/crepe/crepe-example-outputs.component";
import {CrepeExamplePluginComponent} from "./routes/documention/examples/crepe/crepe-example-plugin.component";
import {
  NgMilkdownExampleBasicComponent
} from "./routes/documention/examples/editor/ng-milkdown-example-basic.component";
import {NgMilkdownExampleComponent} from "./routes/documention/examples/editor/ng-milkdown-example.component";
import {
  NgMilkdownExampleOutputsComponent
} from "./routes/documention/examples/editor/ng-milkdown-example-outputs.component";
import {
  NgMilkdownExamplePluginComponent
} from "./routes/documention/examples/editor/ng-milkdown-example-plugin.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'ng-milkdown-crepe', component: CrepeComponent},
      {path: 'crepe-example-basic', component: CrepeExampleBasicComponent},
      {path: 'crepe-example-feature', component: CrepeExampleFeatureComponent},
      {path: 'crepe-example-outputs', component: CrepeExampleOutputsComponent},
      {path: 'crepe-example-plugin', component: CrepeExamplePluginComponent},

      {path: 'ng-milkdown-example', component: NgMilkdownExampleComponent},
      {path: 'ng-milkdown-example-basic', component: NgMilkdownExampleBasicComponent},
      {path: 'ng-milkdown-example-outputs', component: NgMilkdownExampleOutputsComponent},
      {path: 'ng-milkdown-example-plugin', component: NgMilkdownExamplePluginComponent},

      { path: '**', redirectTo: 'overview' }
    ]
  },
];
