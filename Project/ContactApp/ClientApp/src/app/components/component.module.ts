import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentRoutingModule } from './component-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { ContactCrudComponent } from './contact/contact-crud/contact-crud.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactViewComponent,
    ContactCrudComponent
  ],
  imports: [
    ComponentRoutingModule,
    SharedModule
  ],
  providers: [
    {
    provide: APP_BASE_HREF,
    useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
    deps: [PlatformLocation]
  }],
  bootstrap: [HomeComponent]
})
export class ComponentModule { }
