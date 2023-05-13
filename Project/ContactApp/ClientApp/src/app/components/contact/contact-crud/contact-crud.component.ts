import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { ContactService } from "src/app/factoryservice/contact.service";
import { CustomResponse } from "src/app/modals/custom-response";
import { LoadingService } from "src/app/servicehelpers/loading.service";
import { MessageNotifyService } from "src/app/servicehelpers/message-notify.service";

@Component({
  selector: "app-contact-crud",
  templateUrl: "./contact-crud.component.html",
  styleUrls: ["./contact-crud.component.scss"],
})
export class ContactCrudComponent implements OnInit {
  contactForm: FormGroup;
  isView: boolean = false;
  isEdit: boolean = false;
  screenTitle : string = ''; 


  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private contactService: ContactService,
    private notify: MessageNotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      ContactId: [0],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      PhoneNumber: [null, [Validators.required, Validators.minLength(10)]],
      Address: [null, Validators.required],
      City: [null, Validators.required],
      State: [null, Validators.required],
      Country: [null, Validators.required],
      PostalCode: [null, [Validators.required, Validators.minLength(6)]],
    });

    let data = this.route.snapshot.data as any;
    if(data)
    {
      this.screenTitle = data.breadcrumb;
    }

    if (location.pathname.indexOf("view") !== -1) {
      this.contactForm.disable();
      this.isView = true;
    } else if (location.pathname.indexOf("edit") !== -1) {
      this.isEdit = true;
    }
    if (this.isView || this.isEdit) {
      this.populateForm();
    }
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    let data = this.contactForm.getRawValue();
    this.loading.setLoading(true);
    this.contactService.CreateUpdateContact(data).subscribe(
      (result: CustomResponse) => {
        this.loading.setLoading(false);
        if (result.IsSuccess) {
          this.notify.showSuccessMessage(result.Title, result.Message);
          this.router.navigate(["/contact"]);
        } else {
          this.notify.showErrorMessage(result.Title, result.Message);
        }
      },
      (error) => {
        this.notify.showErrorMessage("Error", "App Error");
        this.loading.setLoading(false);
      }
    );
  }

  populateForm() {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "0");
    this.loading.setLoading(true);
    this.contactService.GetContact(id).subscribe(
      (result: CustomResponse) => {
        this.loading.setLoading(false);
        if (result.IsSuccess) {
          let contactData = result.Data.contact;
          // create the form group with initial values
          this.contactForm = this.fb.group({
            ContactId: [contactData.ContactId],
            FirstName: [contactData.FirstName, Validators.required],
            LastName: [contactData.LastName, Validators.required],
            Email: [contactData.Email, [Validators.required, Validators.email]],
            PhoneNumber: [
              contactData.PhoneNumber,
              [Validators.required, Validators.minLength(10)],
            ],
            Address: [contactData.Address, Validators.required],
            City: [contactData.City, Validators.required],
            State: [contactData.State, Validators.required],
            Country: [contactData.Country, Validators.required],
            PostalCode: [
              contactData.PostalCode,
              [Validators.required, Validators.minLength(6)],
            ],
          });
        }
      },
      (error) => {
        this.notify.showErrorMessage("Error", "App Error");
        this.loading.setLoading(false);
      }
    );
  }

  OnDelete() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this contact?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        let id = parseInt(this.route.snapshot.paramMap.get("id") || "0");
        this.loading.setLoading(true);
        this.contactService.DeleteContact(id).subscribe(
          (result: CustomResponse) => {
            this.loading.setLoading(false);
            if (result.IsSuccess) {
              this.notify.showSuccessMessage(result.Title, result.Message);
              this.router.navigate(["/contact"]);
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

  onClearAll() {
    this.contactForm.markAsUntouched();
  }
}
