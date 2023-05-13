import { Injectable } from '@angular/core';
import { ApiService } from '../servicehelpers/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  path_prefix = '/Contact';
  constructor(private apiservice : ApiService) { }


  CreateUpdateContact(data:any)
  {
    let path = this.path_prefix + "/CreateUpdateContact"
    return this.apiservice.post(path,data);
  }
  
  GetContactList()
  {
    let path = this.path_prefix + "/GetContactList"
    return this.apiservice.get(path);
  }
  
  DeleteContact(contactid:number)
  {
    let path = this.path_prefix + "/DeleteContact/" + contactid
    return this.apiservice.delete(path);
  }
  
  GetContact(contactid:number)
  {
    let path = this.path_prefix + "/GetContact/" + contactid
    return this.apiservice.get(path);
  }

}
