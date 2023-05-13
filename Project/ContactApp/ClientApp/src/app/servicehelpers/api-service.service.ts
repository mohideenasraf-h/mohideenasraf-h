import { HttpClient, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoadingService } from "./loading.service";
import { LoggerService } from "./logger-service";
import { APP_BASE_HREF } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  readonly BASE_API = null;
  readonly BASE_URL = null;

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private logger: LoggerService,
    @Inject(APP_BASE_HREF) baseHref: string
  ) {
    this.BASE_API = location.origin + baseHref + "api";
    this.BASE_URL = this.BASE_API;
  }

  get(path: string): Observable<any> {
    const url = `${this.BASE_API}${path}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        return this.intercept(res, url, "GET");
      }),
      catchError(this.handleError<any>())
    );
  }

  delete(path: string): Observable<any> {
    const url = `${this.BASE_API}${path}`;

    return this.http.delete<any>(url).pipe(
      map((res) => {
        return this.intercept(res, url, "DELETE");
      }),
      catchError(this.handleError<any>())
    );
  }

  postWithoutParams(path: string, data: any): Observable<any> {
    const url = `${this.BASE_URL}${path}`;
    this.logger.Log(`%cparams[POST] ${url}`, "color: cyan", data);

    return this.http.post<any>(url, data).pipe(
      map((res) => {
        return this.intercept(res, url, "POST");
      }),
      catchError(this.handleError<any>())
    );
  }

  post(path: string, data: any): Observable<any> {
    const url = `${this.BASE_URL}${path}`;
    this.logger.Log(`%cparams[POST] ${url}`, "color: cyan", data);

    return this.http.post<any>(url, data).pipe(
      map((res) => {
        return this.intercept(res, url, "POST");
      }),
      catchError(this.handleError<any>())
    );
  }
  postFile(path: string, data: any): Observable<any> {
    const url = `${this.BASE_URL}${path}`;
    this.logger.Log(`%cparams[POST] ${url}`, "color: cyan", data);

    this.logger.Log("URL", url, data);
    return this.http.post(url, data, { responseType: "blob" });
  }
  getFile(path: string, data: any): Observable<any> {
    const url = `${this.BASE_URL}${path}`;
    this.logger.Log(`%cparams[POST] ${url}`, "color: cyan", data);

    this.logger.Log("URL", url, data);
    return this.http.get(url, { responseType: "blob" });
  }
  put(path: string, data: any): Observable<any> {
    const url = `${path}`;
    this.logger.Log(`%cparams[PUT] ${url}`, "color: cyan", data);
    return this.http.put<any>(url, data).pipe(
      map((res) => {
        return this.intercept(res, url, "PUT");
      })
    );
  }

  private handleError<T>(result?: T) {
    return (): Observable<T> => {
      setTimeout(() => {
        this.loading.setLoading(false);
      }, 0);
      return of(result as T);
    };
  }

  private requests: HttpRequest<any>[] = [];
  public intercept(request: HttpRequest<any>, url: string, type: string) {
    this.logger.Log(`%ccall[${type}] ${url}`, "color: orange", request);
    this.requests.push(request);
    this.removeRequest(request);
    return request;
  }
  public removeRequest(req: HttpRequest<any>) {
    const INDEX = this.requests.indexOf(req);
    if (INDEX >= 0) {
      this.requests.splice(INDEX, 1);
    }
  }
}
