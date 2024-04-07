import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeCustomModule } from '@shared/pipe/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogDetailComponent } from 'src/app/home/home/blog-detail/blog-detail.component';
import { HomeComponent } from 'src/app/home/home/home.component';
import { ViewBlogComponent } from 'src/app/home/home/view-blog/view-blog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: BlogDetailComponent },
  { path: 'detail/:id', component: ViewBlogComponent },
];
@NgModule({
  declarations: [HomeComponent, BlogDetailComponent, ViewBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    PipeCustomModule,
  ],
  providers: [],
})
export class HomeChildModule {}
