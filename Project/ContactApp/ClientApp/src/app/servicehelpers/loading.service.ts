import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  private subjectLoading = new Subject<boolean>();
  public isLoading: boolean;
  readonly Loading$ = this.subjectLoading.asObservable();

  setLoading(value: boolean): void {
    // value ? console.log('%c-------- Loading --------', 'color: lawngreen') : console.log('%c-------------------------', 'color: lawngreen');
    this.isLoading = value;
    this.subjectLoading.next(value);
  }
}
