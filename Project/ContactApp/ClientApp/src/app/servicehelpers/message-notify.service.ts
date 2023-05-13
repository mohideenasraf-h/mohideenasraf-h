import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageNotifyService {

  constructor(private messageService: MessageService) { }

  showSuccessMessage(title:string,message:string) {
    this.messageService.add({ severity: 'success' , summary: title, detail: message });
  }

  showErrorMessage(title:string,message:string) {
    this.messageService.add({ severity: 'error' , summary: title, detail: message });
  }

  showWarningMessage(title:string,message:string) {
    this.messageService.add({ severity: 'warning' , summary: title, detail: message });
  }

  showInfoMessage(title:string, message:string) {
    this.messageService.add({ severity: 'info' , summary: title, detail: message });
  }
}
