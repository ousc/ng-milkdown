import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {AppComponent} from "./app/app.component";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
