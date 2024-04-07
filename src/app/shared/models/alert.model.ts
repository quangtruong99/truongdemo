import { CrudType } from '@shared/enums/crud-type.enum';
import { ACTION_TYPE, Utils } from '@shared/enums/utils';

export interface AlertModel {
  title: Utils | string;
  icon?: string;
  arrayMessage?: string[];
  message: string;
  mode: CrudType;
  textBtnConfirm?: string;
  textBtnSuccess?: string;
  textBtnError?: string;
  role?: number;
  class?: string;
  back?: boolean;
  id?: any;
  text?: string;
  reget?: boolean;
  action?: ACTION_TYPE;
  refreshToken?: boolean;
}

export interface ConfirmModel {
  title: string;
  message: string;
  image?: string;
  textBtnCancel?: string;
  textBtnOk?: string;
  back?: boolean;
  text?: string;
  id?: string;
}
