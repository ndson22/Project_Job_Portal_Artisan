import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrontendRoutingModule } from './frontend-routing.module';

// Extra
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { EditorModule } from "@tinymce/tinymce-angular";

// Partials
import { HeaderComponent } from './_partials/header/header.component';
import { BreadcrumbComponent } from './_partials/breadcrumb/breadcrumb.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { ProfileSidebarComponent } from './_partials/profile-sidebar/profile-sidebar.component';

// Layouts
import { MainComponent } from './_layouts/main/main.component';
import { ProfileComponent } from './_layouts/profile/profile.component';
import { HomeComponent } from './_layouts/home/home.component';

// Sepcific
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { CopyrightComponent } from './_partials/copyright/copyright.component';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileUserDetailComponent } from './profiles/profile-user-detail/profile-user-detail.component';
//pipes
import { PostPipePipe } from "../shared/pipes/post-pipe.pipe";

@NgModule({
  declarations: [
    PostPipePipe,
    // Partials
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    CopyrightComponent,
    ProfileSidebarComponent,

    // Layouts
    ErrorsComponent,
    HomeComponent,
    MainComponent,
    ProfileComponent,

    // Sepcific
    JobListComponent,
    JobDetailComponent,
    JobEditComponent,
    JobCreateComponent,
    RegisterComponent,
    LoginComponent,
    ProfileUserDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FrontendRoutingModule,

    // Extra
    NgbModule,
    EditorModule,
    TimeagoModule.forChild(),
  ],
})
export class FrontendModule {}
