import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';

// Import components
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { HomeComponent } from './_layouts/home/home.component';
import { MainComponent } from './_layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
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
        path: 'create',
        component: JobCreateComponent,
      },
      {
        path: ':id',
        component: JobDetailComponent,
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
