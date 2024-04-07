import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogComponent } from './view-blog.component';

describe('ViewBlogComponent', () => {
  let component: ViewBlogComponent;
  let fixture: ComponentFixture<ViewBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBlogComponent]
    });
    fixture = TestBed.createComponent(ViewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
