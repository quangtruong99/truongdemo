import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from '@shared/components/alert/component-actions';
import { CrudType } from '@shared/enums/crud-type.enum';
import { Utils } from '@shared/enums/utils';
import { BlogInterface } from '@shared/models/blog.model';
import { ValidationService } from '@shared/services/validation.service';
import { Subject, Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  id: string;
  imageUrl: any = '';
  formBlog: FormGroup | any;
  formError = {
    title: '',
    content: '',
  };
  messageError = {
    title: {
      required: 'field is required',
      whitespace: 'field is required',
      minlength: '4 characters minimum',
    },
    content: {
      required: 'field is required',
      whitespace: 'field is required',
      minlength: '4 characters minimum',
    },
  };
  isCreate = false;
  subject_success: Subscription;
  constructor(
    private componentAction: ComponentActions,
    private homeService: HomeService,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id') as string;
    if (this.id === 'create') {
      this.isCreate = true;
    } else {
      this.getDetailBlog();
    }
    this.initFormBlog();
    this.subject_success = this.componentAction.subject_success.subscribe(
      (res: any) => {
        if (res) {
          this.router.navigate([`/home`]);
        }
      }
    );
  }

  initFormBlog() {
    this.formBlog = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.validationService.noWhitespaceValidator,
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.validationService.noWhitespaceValidator,
        ],
      ],
      image: ['', []],
    });
    this.formBlog.valueChanges.subscribe((data: BlogInterface) =>
      this.onValueChanged(data)
    );
  }

  onValueChanged(data?: BlogInterface) {
    this.validationService.getValidate(
      this.formBlog,
      this.formError,
      this.messageError
    );
  }

  getDetailBlog() {
    this.componentAction.showLoading();
    this.homeService.getBlogDetail(this.id).subscribe({
      next: res => {
        this.formBlog.patchValue({
          ...res,
        });
        this.imageUrl = res?.image;
        this.componentAction.hideLoading();
      },
      error: err => {
        this.componentAction.hideLoading();
      },
    });
  }

  upload() {
    document.getElementById('file-upload')?.click();
  }

  async on_change(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (file) {
        const maxSizeMegabyte = 0.048828125;
        const maxSizeByte = maxSizeMegabyte * 1048576;
        if (file.size > maxSizeByte) {
        } else {
          this.imageUrl = await this.fileToBase64(file);
          this.formBlog.get('image').setValue(this.imageUrl);
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileToBase64 = async (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = e => reject(e);
    });

  saveBlog() {
    if (this.formBlog.invalid) {
      this.formError = this.validationService.checkErorrNotDiry(
        this.formBlog,
        this.formError,
        this.messageError
      );
      return;
    }
    const body = {
      title: this.formBlog.value.title,
      content: this.formBlog.value.content,
      image: this.formBlog.value.image,
    };
    this.componentAction.showLoading();
    if (this.isCreate) {
      this.homeService.createBlog(body).subscribe({
        next: res => {
          this.componentAction.showPopup({
            title: 'Success',
            message: 'create successfully',
            mode: CrudType.SUCCESS,
            class: 'btn-blue',
            reget: true,
            text: 'OK',
          });
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
    } else {
      this.homeService.updateBlog(this.id, body).subscribe({
        next: res => {
          this.componentAction.showPopup({
            title: 'Success',
            message: 'create successfully',
            mode: CrudType.SUCCESS,
            class: 'btn-blue',
            reget: true,
            text: 'OK',
          });
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
  }

  ngOnDestroy(): void {
    if (this.subject_success) {
      this.subject_success.unsubscribe();
    }
  }
}
