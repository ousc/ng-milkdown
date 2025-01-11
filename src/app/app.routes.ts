import {AppComponent} from "./app.component";
import {Routes} from '@angular/router';
import {WorkGroundComponent} from "./routes/work-ground/work-ground.component";
import {WorkGroundCrepComponent} from "./routes/work-ground-crepe/work-ground-crepe.component";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: 'work-ground', pathMatch: 'full'},
      {path: 'work-ground', component: WorkGroundComponent},
      {path: 'work-ground-crepe', component: WorkGroundCrepComponent},
    ]
  },
];
