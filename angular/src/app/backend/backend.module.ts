import { BackendRoutingModule } from "./backend-routing.module";
import { BreadcrumbComponent } from "./_partials/breadcrumb/breadcrumb.component";
import { CommonModule } from "@angular/common";
import { EditorModule } from "@tinymce/tinymce-angular";
import { ErrorsComponent } from "./_layouts/errors/errors.component";
import { FooterComponent } from "./_partials/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./_partials/header/header.component";
import { MainComponent } from "./_layouts/main/main.component";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "./_partials/sidebar/sidebar.component";
import { TimeagoModule } from "ngx-timeago";

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
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { JobListComponent } from './jobs/job-list/job-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    ErrorsComponent,
    MainComponent,
    CompanyListComponent,
    JobListComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackendRoutingModule,

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
    NzDividerModule,

    // Extra
    EditorModule,
    TimeagoModule.forChild(),
  ],
})
export class BackendModule {}
