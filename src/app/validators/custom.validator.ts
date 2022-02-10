import { AbstractControl, ValidatorFn } from "@angular/forms";


export function checkPasswords(group: AbstractControl) {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { missMatch: true }
  }

  export function checkEmail(group: AbstractControl) {
    let pass = group.get('email')!.value;
    let confirmPass = group.get('confirmEmail')!.value
    return pass === confirmPass ? null : { missMatch: true }

}
