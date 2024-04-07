import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRouting } from 'src/app/home/home.routing.module';
import { HomeService } from 'src/app/home/home.service';
import { LayoutModule } from 'src/app/shared/layouts/layout.module';
@NgModule({
  imports: [CommonModule, HomeRouting, LayoutModule],
  declarations: [],
  providers: [HomeService],
})
export class HomeModule {}
