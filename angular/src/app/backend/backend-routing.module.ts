import { AuthGuard } from '../shared/guards/auth.guard';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { MainComponent } from './_layouts/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { CompanyListComponent } from './companies/company-list/company-list.component';

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
