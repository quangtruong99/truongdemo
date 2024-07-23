import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeCustomModule } from '@shared/pipe/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AtmListComponent } from 'src/app/atm/atm-list/atm-list.component';
import { AtmService } from 'src/app/atm/atm.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzResultModule } from 'ng-zorro-antd/result';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'atm',
    pathMatch: 'full',
  },
  { path: 'atm', component: AtmListComponent },
];
@NgModule({
  declarations: [AtmListComponent],
  imports: [
    NzTableModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    NzIconModule,
    NzResultModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    PipeCustomModule,
  ],
  providers: [AtmService],
})
export class AtmModule {}
