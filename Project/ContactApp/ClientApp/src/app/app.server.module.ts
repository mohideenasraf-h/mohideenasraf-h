import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule],
    bootstrap: [HomeComponent]
})
export class AppServerModule { }
