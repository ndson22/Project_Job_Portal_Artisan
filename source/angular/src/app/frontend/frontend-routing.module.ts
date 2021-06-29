import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';

// Import components
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { MainComponent } from './_layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: MainComponent,
    children: [
      {
        path: '',
        component: JobListComponent,
      },
      {
        path: 'id',
        component: JobDetailComponent,
      },
      {
        path: 'create',
        component: JobCreateComponent,
      },
      {
        path: 'edit/id',
        component: JobEditComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {}
