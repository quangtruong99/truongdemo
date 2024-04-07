import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
@Injectable()
export class HomeService extends BaseService {
  constructor(private httpc: HttpClient) {
    super(httpc);
  }

  //blogs
  createBlog(body: any, header?: any) {
    return this.postData(`blogs`, body);
  }

  getListBlogs() {
    return this.getData(`blogs`);
  }

  getBlogDetail(id: string) {
    return this.getData(`blogs/${id}`);
  }

  updateBlog(id: string, body: any) {
    return this.putData(`blogs/${id}`, body);
  }
  deletePost(id: string) {
    return this.delete(`blogs/${id}`);
  }
}
