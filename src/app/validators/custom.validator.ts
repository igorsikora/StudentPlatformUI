import { AbstractControl } from "@angular/forms";


export function checkPasswords(group: AbstractControl) {
    let pass = String(group.get('password')!.value).toLowerCase()
    let confirmPass =  String(group.get('confirmPassword')!.value).toLowerCase()
    return pass === confirmPass ? null : { missMatch: true }
  }

  export function checkEmail(group: AbstractControl) {
    let pass = String(group.get('email')!.value).toLowerCase()
    let confirmPass = String(group.get('confirmEmail')!.value).toLowerCase()
    return pass === confirmPass ? null : { missMatch: true }

}
