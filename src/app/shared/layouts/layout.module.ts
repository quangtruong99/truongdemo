import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "src/app/shared/layouts/home-layout/home-layout.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
      HomeLayoutComponent
    ],
    exports: [
      HomeLayoutComponent,
    ]
})
export class LayoutModule { }
