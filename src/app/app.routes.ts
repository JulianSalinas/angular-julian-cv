import { Routes } from '@angular/router';
import { CvComponent } from './pages/cv/cv.component';

export const routes: Routes = [
  {
    path: '',
    component: CvComponent,
  },
  {
    path: 'cv',
    component: CvComponent,
  },
];
