import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactCrudComponent } from "./contact/contact-crud/contact-crud.component";
import { ContactViewComponent } from "./contact/contact-view/contact-view.component";

const routes: Routes = [
  { path: "contact", component: ContactViewComponent },
  { path: "contact/create", component: ContactCrudComponent, data: { breadcrumb : "Create" } },
  { path: "contact/view/:id", component: ContactCrudComponent, data: { breadcrumb : "View" }},
  { path: "contact/edit/:id", component: ContactCrudComponent, data: { breadcrumb : "Edit" } },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "/contact" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class ComponentRoutingModule {}
