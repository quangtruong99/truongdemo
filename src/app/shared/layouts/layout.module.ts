import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@shared/layouts/footer/footer.component';
import { HeaderComponent } from '@shared/layouts/header/header.component';
import { HomeLayoutComponent } from 'src/app/shared/layouts/home-layout/home-layout.component';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomeLayoutComponent, HeaderComponent, FooterComponent],
  exports: [HomeLayoutComponent],
})
export class LayoutModule {}
