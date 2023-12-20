import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
      <router-outlet/>`,
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {
}
