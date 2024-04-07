import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  public getValidate(
    form: FormGroup,
    formErrors: any,
    validationMessages: any
  ) {
    if (!form) {
      return formErrors;
    }
    // clear previous error message (if any)
    this.resetFormErrors(formErrors);
    for (const field in formErrors) {
      const control = form.get(field);
      if (typeof formErrors[field] == 'object') {
        this.getValidate(
          control as FormGroup,
          formErrors[field],
          validationMessages[field]
        );
      }
      if (typeof formErrors[field] == 'string') {
        if (control && control.dirty && !control.valid && !formErrors[field]) {
          const messages = validationMessages[field];
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            if (!formErrors[field] && messages[key]) {
              formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
    return formErrors;
  }

  checkErorrNotDiry(form: FormGroup, formErrors: any, validationMessages: any) {
    if (!form) {
      return formErrors;
    }
    // clear previous error message (if any)
    this.resetFormErrors(formErrors);

    for (const field in formErrors) {
      const control = form.get(field);
      if (typeof formErrors[field] == 'object') {
        this.checkErorrNotDiry(
          control as FormGroup,
          formErrors[field],
          validationMessages[field]
        );
      }
      if (typeof formErrors[field] == 'string') {
        (control as FormControl).markAsDirty();
        if (control && control.invalid && !formErrors[field]) {
          const messages = validationMessages[field];
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            if (!formErrors[field] && messages[key]) {
              formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
    return formErrors;
  }
  //no contetn validater
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace: any = null;
    if (control.value) {
      if (String(control.value).trim().length == 0) {
        isWhitespace = true;
      } else {
        isWhitespace = null;
      }
    } else {
      isWhitespace = null;
    }

    return isWhitespace ? { whitespace: true } : null;
  }

  public fullWidthNumConvert(fullWidthNum: string) {
    return fullWidthNum.replace(/[\uFF10-\uFF19]/g, function (m: string) {
      return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
    });
  }

  public matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!control.value) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error(
            'matchOtherValidator(): other control is not found in parent group'
          );
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true,
        };
      }
      return null;
    };
  }
  resetFormErrors(ferrors: any) {
    for (const prop in ferrors) {
      if (typeof ferrors[prop] == 'object') {
        this.resetFormErrors(ferrors[prop]);
      } else {
        ferrors[prop] = '';
      }
    }
  }
}
