import {Routes} from '@angular/router';
import {WorkGroundComponent} from "./router/work-ground/workGround.component";
import {CollaborativeEditingComponent} from "./router/collaborative-editing/collaborative-editing.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: 'work-ground', pathMatch: 'full'},
      {path: 'work-ground', component: WorkGroundComponent},
      {path: 'collaborative-editing', component: CollaborativeEditingComponent}
    ]
  },
];
