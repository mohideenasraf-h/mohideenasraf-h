import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { ContactService } from "src/app/factoryservice/contact.service";
import { Contact } from "src/app/modals/contact";
import { CustomResponse } from "src/app/modals/custom-response";
import { LoadingService } from "src/app/servicehelpers/loading.service";
import { MessageNotifyService } from "src/app/servicehelpers/message-notify.service";

@Component({
  selector: "app-contact-view",
  templateUrl: "./contact-view.component.html",
  styleUrls: ["./contact-view.component.scss"],
})
export class ContactViewComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private loading: LoadingService,
    private contactService: ContactService,
    private notify: MessageNotifyService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.FetchAll();
  }

  FetchAll() {
    this.contacts = [];
    this.loading.setLoading(true);
    this.contactService.GetContactList().subscribe(
      (result: CustomResponse) => {
        this.loading.setLoading(false);
        if (result.IsSuccess) {
          this.contacts = result.Data.contacts;
        }
      },
      (error) => {
        this.notify.showErrorMessage("Error", "App Error");
        this.loading.setLoading(false);
      }
    );
  }

  OnDelete(id:number){
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this contact?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.loading.setLoading(true);
        this.contactService.DeleteContact(id).subscribe(
          (result: CustomResponse) => {
            this.loading.setLoading(false);
            if (result.IsSuccess) {
              this.FetchAll();
              this.notify.showSuccessMessage(result.Title, result.Message);
            }
          },
          (error) => {
            this.notify.showErrorMessage("Error", "App Error");
            this.loading.setLoading(false);
          }
        );
      },
    });
  }

  isMobileDevice(): boolean {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    )
      return true;

    return false;
  }
}
