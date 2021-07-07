import { AuthGuard } from '../shared/guards/auth.guard';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { MainComponent } from './_layouts/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { JobListComponent } from './jobs/job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full',
  },
  {
    path: 'companies',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent,
        data: { title: 'Companies' },
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
        data: { title: 'Jobs' },
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
export class BackendRoutingModule {}
