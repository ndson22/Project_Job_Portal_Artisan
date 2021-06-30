import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';

// Partials
import { BreadcrumbComponent } from './_partials/breadcrumb/breadcrumb.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { HeaderComponent } from './_partials/header/header.component';
import { SidebarComponent } from './_partials/sidebar/sidebar.component';

// Extra
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { ErrorsComponent } from './_layouts/errors/errors.component';
import { MainComponent } from './_layouts/main/main.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    ErrorsComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackendRoutingModule,

    // Extra
    NgbModule,
    EditorModule,
    TimeagoModule.forChild(),
  ],
})
export class BackendModule {}
