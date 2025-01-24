import {Routes} from '@angular/router';
import {WorkGroundComponent} from "./routes/work-ground/work-ground.component";
import {OverviewComponent} from "./routes/documention/overview.component";
import {CrepeComponent} from "./routes/documention/examples/crepe/crepe.component";
import {CrepeExampleBasicComponent} from "./routes/documention/examples/crepe/crepe-example-basic.component";
import {CrepeExampleFeatureComponent} from "./routes/documention/examples/crepe/crepe-example-feature.component";
import {CrepeExampleOutputsComponent} from "./routes/documention/examples/crepe/crepe-example-outputs.component";
import {CrepeExamplePluginComponent} from "./routes/documention/examples/crepe/crepe-example-plugin.component";
import {
  NgMilkdownExampleBasicComponent
} from "./routes/documention/examples/normal/ng-milkdown-example-basic.component";
import {NgMilkdownDComponent} from "./routes/documention/examples/normal/ng-milkdown-d.component";

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

      {path: 'ng-milkdown-d', component: NgMilkdownDComponent},
      {path: 'ng-milkdown-example-basic', component: NgMilkdownExampleBasicComponent},

      {path: 'work-ground', component: WorkGroundComponent},
      { path: '**', redirectTo: 'work-ground' }
    ]
  },
];
