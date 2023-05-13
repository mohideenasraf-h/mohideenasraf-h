import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingService } from "../../servicehelpers/loading.service";
import { LoggerService } from "../../servicehelpers/logger-service";
import { Location } from "@angular/common";
//var $:any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit{
  headerData: any;
  menuData: any;
  loading: boolean = false;
  hasnt_access:boolean = false;

  constructor(
    private loadingService: LoadingService,
    private logger: LoggerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadingService.Loading$.subscribe((load) => {
      setTimeout(() => {
        this.loading = load;
      }, 0);
    });

    this.Initialize();
  }

  Initialize() {
    
  }

  onImpChangeByChild(evt) {
    if (!evt) {
      sessionStorage.removeItem("imp");
    } else {
      sessionStorage.setItem("imp", evt);
    }
    this.ReloadCurrentPage();
  }

  ReloadCurrentPage() {
    this.location.go(this.location.path(true));
    window.location.reload();
  }
}
