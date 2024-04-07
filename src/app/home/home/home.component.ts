import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from '@shared/components/alert/component-actions';
import { CrudType } from '@shared/enums/crud-type.enum';
import { Utils } from '@shared/enums/utils';
import { HomeService } from 'src/app/home/home.service';
import { BlogInterface } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  queryparam = {
    searchText: '',
  };
  listBlog: BlogInterface[] = [];
  p = 1;
  limit = 10;
  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private componentAction: ComponentActions
  ) {}
  ngOnInit(): void {
    this.getListBlog();
  }

  getListBlog() {
    this.componentAction.showLoading();
    this.homeService.getListBlogs().subscribe({
      next: res => {
        this.listBlog = res;
        this.componentAction.hideLoading();
      },
      error: err => {
        this.componentAction.showPopup({
          title: Utils.TITLE_ERROR,
          message: err.errors,
          mode: CrudType.CLOSE,
        });
        this.componentAction.hideLoading();
      },
    });
  }

  navigateDetail(blog: BlogInterface) {
    this.router.navigate([`home/detail/${blog?.id}`]);
  }

  navigateEdit(blog: BlogInterface) {
    this.router.navigate([`home/${blog?.id}`]);
  }

  createBlog() {
    this.router.navigate([`home/create`]);
  }
}
