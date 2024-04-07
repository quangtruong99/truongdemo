import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from '@shared/components/alert/component-actions';
import { BlogInterface } from '@shared/models/blog.model';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  id: any;
  blogDetail: BlogInterface | any;
  constructor(
    private componentAction: ComponentActions,
    private homeService: HomeService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id');
    this.getDetailBlog();
  }

  getDetailBlog() {
    this.componentAction.showLoading();
    this.homeService.getBlogDetail(this.id).subscribe({
      next: res => {
        this.convertData(res);
        this.componentAction.hideLoading();
      },
      error: err => {
        this.componentAction.hideLoading();
      },
    });
  }
  convertData(data: BlogInterface) {
    this.blogDetail = {
      ...data,
      image: data?.image,
      title: data.title,
      content: data.content,
      created_at: this.timeConvert(data.updated_At),
    };
  }

  timeConvert(uintTime: number) {
    const timestamp = uintTime * 1000;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }
}
