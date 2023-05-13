import { Injectable } from "@angular/core";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class CommonUtilities {
  //timer: NodeJS.Timeout;
  pageLoadScript() {
    $(document).ready(() => {
      this.stickyFunction();
      $(window).bind('resize', () => {
        this.stickyFunction();
      });
    });
  }

  stickyFunction(){
    var bdyWidth = $(window).outerWidth(true);
    if(bdyWidth >= 1200){
      var hdrHeight = $('header').outerHeight(true) + 30;
      if ($(window).scrollTop() > hdrHeight) {
        $(".filter-categories").addClass('sticky-fixed');
      }
    }
    else{
      $('.filter-categories').removeClass('sticky-fixed');
    }
    $(window).scroll(function () {
      if(bdyWidth >= 1200){
        var hdrHeight = $('header').outerHeight(true) + 30;
        var scrollTop = $(window).scrollTop();
        if (scrollTop > hdrHeight) {
            $('.filter-categories').addClass('sticky-fixed');
            return false;
        } else if (scrollTop < hdrHeight) {
            $('.filter-categories').removeClass('sticky-fixed');
            return false;
        }
      }
      else{
        $('.filter-categories').removeClass('sticky-fixed');
      }
    });
  }

  constructor() {}
}
