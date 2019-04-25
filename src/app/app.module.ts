import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { SsrRenderDirective } from './ssr-render.directive';
import { SsrNoRenderDirective } from './ssr-no-render.directive';
import { ProductComponent } from './product/product.component';
import { FeedComponent } from './feed/feed.component';
import { ServerTransferStateModule } from '@angular/platform-server';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    SsrRenderDirective,
    SsrNoRenderDirective,
    ProductComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ModuleMapLoaderModule,
    AppRoutingModule,
    HttpClientModule,
    ServerTransferStateModule,
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
