import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routing } from 'src/app/app.routing';
import { PageErrorComponent } from 'src/app/page-error/page-error.component';
import { LayoutModule } from 'src/app/shared/layouts/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from '@shared/components/alert/alert.module';

@NgModule({
  declarations: [AppComponent, PageErrorComponent],
  imports: [
    BrowserModule,
    Routing,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
