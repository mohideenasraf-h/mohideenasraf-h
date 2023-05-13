import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { ComponentModule } from './components/component.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    
    ComponentModule,
    SharedModule.forRoot()
  ],
  providers: [
    {
    provide: APP_BASE_HREF,
    useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
    deps: [PlatformLocation]
  }],
  bootstrap: [HomeComponent]
})
export class AppModule { }
