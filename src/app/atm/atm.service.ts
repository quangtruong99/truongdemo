import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
@Injectable()
export class AtmService extends BaseService {
  constructor(private httpc: HttpClient) {
    super(httpc);
  }

  //atm
  createAtm(body: any, header?: any) {
    return this.postData(`atm`, body);
  }

  getListAtm() {
    return this.getData(`atm`);
  }

  getAtmDetail(id: string) {
    return this.getData(`atm/${id}`);
  }

  updateAtm(id: string, body: any) {
    return this.putData(`atm/${id}`, body);
  }
  deleteAtm(id: string) {
    return this.delete(`atm/${id}`);
  }
}
