import { AboutUsComponent } from './_layouts/about-us/about-us.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardJobListComponent } from './profiles/dashboard-job-list/dashboard-job-list.component';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { FeatureJobsComponent } from './home/feature-jobs/feature-jobs.component';
import { HomeComponent } from './_layouts/home/home.component';
import { IsLoggedInGuard } from '../shared/guards/is-logged-in.guard';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './_layouts/main/main.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './_layouts/profile/profile.component';
import { ProfileUserDetailComponent } from './profiles/profile-user-detail/profile-user-detail.component';
import { RegisterComponent } from './auth/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './_layouts/contact-us/contact-us.component';
import { CompanyGuard } from '../shared/guards/company.guard';
import { CompanyDetailComponent } from './profiles/company-detail/company-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'company',
        canActivate: [CompanyGuard],
        component: CompanyDetailComponent,
        data: { title: 'My Company' },
      },
      {
        path: 'account',
        component: ProfileUserDetailComponent,
        data: { title: 'My Account' },
      },
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register' },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'verify-email/:id',
        component: LoginComponent,
        data: { title: 'Verify Email' },
      },
    ],
  },
  {
    path: 'jobs',
    component: MainComponent,
    data: { title: 'Job' },
    children: [
      {
        path: '',
        component: JobListComponent,
        data: { title: 'Job List' },
      },
    ],
  },
  {
    path: 'dashboard/jobs',
    canActivate: [CompanyGuard],
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: DashboardJobListComponent,
        data: { title: "Company's Job List" },
      },
      {
        path: 'create',
        component: JobCreateComponent,
        data: { title: 'Post A Job' },
      },
    ],
  },
  {
    path: 'jobs',
    component: MainComponent,
    children: [
      {
        path: ':id',
        component: JobDetailComponent,
        data: { title: 'Job Detail' },
      },
    ],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { title: 'About Us' },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: { title: 'Contact Us' },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorsComponent,
    data: { title: 'Something Wrong' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {}
