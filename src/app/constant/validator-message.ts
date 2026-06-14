import { Validators } from '@angular/forms';

export class ValidatorMessage {
  public static validation_messages = {
    fullName: [{ type: 'required', message: 'Please insert fullname' },{ type: 'minlength', message: 'minimum character is 5' }],
    employeeCode: [{ type: 'required', message: 'Please insert employee Code' }],
    gender: [{ type: 'required', message: 'Please insert gender' }],
    dateOfBirth: [{ type: 'required', message: 'Please insert date Of Birth' }],
    email: [{ type: 'required', message: 'Please insert email' }],
    phoneNumber: [{ type: 'required', message: 'Please insert Phone Number' }],
    departmentId: [{ type: 'required', message: 'Please select department' }],
    positionId: [{ type: 'required', message: 'Please select positionId' }],
    hireDate: [{ type: 'required', message: 'Please insert hire Date' }],
    salary: [{ type: 'required', message: 'Please insert salary' }]
    
    
  };
}
