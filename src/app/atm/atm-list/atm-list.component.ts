import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentActions } from '@shared/components/alert/component-actions';
import { CrudType } from '@shared/enums/crud-type.enum';
import { Utils } from '@shared/enums/utils';
import { AtmInterface } from '@shared/models/atm.model';
import { AtmService } from 'src/app/atm/atm.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.scss'],
})
export class AtmListComponent implements OnInit {
  queryparam = {
    searchText: '',
  };
  listAtm: Array<AtmInterface>;
  p = 1;
  limit = 10;
  editCache: { [key: string]: { edit: boolean; data: AtmInterface } } = {};
  copylistOfData;
  isVisible = false;
  validateForm: FormGroup<{
    atm_name: FormControl<string>;
    manufacturer: FormControl<string>;
    type: FormControl<string>;
    serial_number: FormControl<string>;
    image: FormControl<string>;
  }>;
  isVisibleMiddle = false;
  imageUrl: any = '';
  isVisibleView = false;
  itemSelect: AtmInterface;
  constructor(
    private atmService: AtmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private componentAction: ComponentActions,
    private fb: NonNullableFormBuilder,
    private msg: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      atm_name: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      type: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      image: [''],
    });
  }
  ngOnInit(): void {
    this.getListAtm();
  }

  getListAtm() {
    this.componentAction.showLoading();
    this.atmService.getListAtm().subscribe({
      next: res => {
        this.listAtm = res;
        this.copylistOfData = [...this.listAtm];
        this.listAtm.forEach(item => {
          this.editCache[item.id] = {
            edit: false,
            data: { ...item },
          };
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

  createAtm() {
    this.router.navigate([`atm/create`]);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listAtm.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listAtm[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listAtm.findIndex(item => item.id === id);
    Object.assign(this.listAtm[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    console.log(this.editCache[id].data);
    this.atmService.updateAtm(id, this.editCache[id].data).subscribe({
      next: res => {},
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

  deleteRow(id: string) {
    this.listAtm = this.listAtm.filter(d => d.id !== id);
    this.atmService.deleteAtm(id).subscribe({
      next: res => {},
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

  search(search) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (
          value[keys[i]] &&
          value[keys[i]].toString().toLocaleLowerCase().includes(search)
        ) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.listAtm = targetValue;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.componentAction.showLoading();
      this.atmService.createAtm(this.validateForm.value).subscribe({
        next: res => {
          this.isVisible = false;
          this.isVisibleMiddle = true;
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
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancelMiddle() {
    this.isVisibleMiddle = false;
    this.getListAtm();
  }

  handleOkMiddle() {
    this.isVisibleMiddle = false;
    this.getListAtm();
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
          this.msg.error('Image must smaller than 50kb!');
        } else {
          this.imageUrl = await this.fileToBase64(file);
          const imageControl: any = this.validateForm.get('image');
          imageControl.setValue(this.imageUrl);
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

  startView(id: string) {
    this.isVisibleView = true;
    const index = this.listAtm.findIndex(item => item.id === id);
    Object.assign(this.listAtm[index], this.editCache[id].data);
    this.itemSelect = this.editCache[id].data;
  }
}
