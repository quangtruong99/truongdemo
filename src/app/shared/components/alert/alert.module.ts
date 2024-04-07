import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfirmComponent } from './alert-confirm/alert-confirm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        AlertConfirmComponent,
        LoadingComponent,

    ],
    exports: [
    ],
    providers: [
    ]
})
export class AlertModule { }
