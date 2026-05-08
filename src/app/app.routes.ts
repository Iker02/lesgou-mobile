import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'workout',
    loadComponent: () =>
      import('./features/workout/template-list/template-list.component').then(
        (m) => m.TemplateListComponent,
      ),
  },
  {
    path: 'workout/detail/:id',
    loadComponent: () =>
      import('./features/workout/template-detail/template-detail.component').then(
        (m) => m.TemplateDetailComponent,
      ),
  },
  {
    path: 'workout/search/:templateId',
    loadComponent: () =>
      import('./features/workout/exercise-search/exercise-search.component').then(
        (m) => m.ExerciseSearchComponent,
      ),
  },
];
