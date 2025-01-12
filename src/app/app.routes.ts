import {Routes} from '@angular/router';
import {WorkGroundComponent} from "./routes/work-ground/work-ground.component";
import {WorkGroundCrepComponent} from "./routes/examples/crepe/work-ground-crepe/work-ground-crepe.component";
import {OverviewComponent} from "./routes/overview.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'work-ground', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'work-ground', component: WorkGroundComponent},
      {path: 'work-ground-crepe', component: WorkGroundCrepComponent},
      { path: '**', redirectTo: 'work-ground' }
    ]
  },
];
