import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrontendRoutingModule } from './frontend-routing.module';

// Extra
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';

// Partials
import { HeaderComponent } from './_partials/header/header.component';
import { BreadcrumbComponent } from './_partials/breadcrumb/breadcrumb.component';
import { FooterComponent } from './_partials/footer/footer.component';

// Layouts
import { MainComponent } from './_layouts/main/main.component';

// Sepcific
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { CopyrightComponent } from './_partials/copyright/copyright.component';
import { JobCreateComponent } from './jobs/job-create/job-create.component';

@NgModule({
  declarations: [
    // Partials
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,

    // Layouts
    MainComponent,

    // Sepcific
    JobListComponent,
    JobDetailComponent,
    JobEditComponent,
    ErrorsComponent,
    CopyrightComponent,
    JobCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FrontendRoutingModule,

    // Extra
    NgbModule,
    TimeagoModule.forChild(),
  ],
})
export class FrontendModule {}
