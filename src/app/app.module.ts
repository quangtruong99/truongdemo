import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routing } from 'src/app/app.routing';
import { PageErrorComponent } from 'src/app/page-error/page-error.component';
import { LayoutModule } from 'src/app/shared/layouts/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from '@shared/components/alert/alert.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, PageErrorComponent],
  imports: [
    BrowserModule,
    Routing,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    AlertModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
