import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FrontendRoutingModule } from './frontend-routing.module';

// Extra
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { EditorModule } from "@tinymce/tinymce-angular";

// Zorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
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
import { FeatureJobsComponent } from './home/feature-jobs/feature-jobs.component';

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
    FeatureJobsComponent,
  ],
  imports: [
    // Zorro
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
    NzDropDownModule,
    NzPaginationModule,
    NzAutocompleteModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzUploadModule,
    NzAvatarModule,
    NzCardModule,
    NzEmptyModule,
    NzImageModule,
    NzListModule,
    NzStatisticModule,
    NzTableModule,
    NzTagModule,
    NzModalModule,
    NzMessageModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzSpinModule,
    NzBackTopModule,
    //
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
