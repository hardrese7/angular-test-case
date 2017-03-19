import { RegisterModalComponent } from './register-modal';
import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page';
import { CreateEventComponent } from './create-event';
import { EventPageComponent } from './event-page';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: StartPageComponent },
  { path: '**',    component: NoContentComponent },
];
