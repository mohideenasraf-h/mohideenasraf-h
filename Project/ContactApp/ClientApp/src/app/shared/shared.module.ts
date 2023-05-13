import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { ConfirmationServiceComponent } from "./confirmation-service/confirmation-service.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "../components/home/home.component";
import { PageTitleComponent } from "./page-title/page-title.component";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import {TableModule} from 'primeng/table';
import {KeyFilterModule} from 'primeng/keyfilter';
@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmationServiceComponent,
    PageTitleComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    SharedRoutingModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastModule,
    ProgressSpinnerModule,
    DialogModule,
    ButtonModule,
    TableModule,
    KeyFilterModule,
    
    LoadingComponent,
    ConfirmationServiceComponent,
    PageTitleComponent,
  ],
  providers: [],
  bootstrap: [HomeComponent],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        MessageService,
        ConfirmationService,
      ],
    };
  }
}
