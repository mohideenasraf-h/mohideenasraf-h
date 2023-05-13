import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_API = location.origin + '/api';
const BASE_URL = BASE_API

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  Log(message?: any,...optionalparams:any[]) {
    //if (!environment.production)
      console.log(message, optionalparams)
  }

  Error(message?: any, ...optionalparams: any[]) {
    //if (!environment.production)
      console.log(message, optionalparams)
  }

}
