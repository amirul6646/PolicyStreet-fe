import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ValidatorMessage } from 'src/app/constant/validator-message';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-insert-update-employee-component',
  templateUrl: './insert-update-employee-component.component.html',
  styleUrls: ['./insert-update-employee-component.component.scss'],
})
export class InsertUpdateEmployeeComponentComponent {
  @Input() mode: string = '';
  @Input() employeeId: number = 0;

  departmentList: any = [];
  positionList: any = [];

  employeeInfo: any = {};

  validation_messages = ValidatorMessage.validation_messages;

  employeeForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public departmentService: DepartmentService,
    public positionService: PositionService,
    public employeeService: EmployeeService,
    private form: FormBuilder,
  ) {
    this.employeeForm = this.form.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],

      employeeCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Z0-9_-]+$/), // EMP001, EMP_01 etc
        ],
      ],

      gender: ['', [Validators.required]],

      dateOfBirth: ['', [Validators.required]],

      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],

      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,12}$/), // simple phone validation
        ],
      ],

      departmentId: ['', [Validators.required]],

      positionId: ['', [Validators.required]],

      hireDate: ['', [Validators.required]],

      salary: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // 2 decimal places
        ],
      ],
    });
  }

  ngOnInit() {
    this.getDepartmentList();
    this.getPositionList();

    if (this.mode == 'E') {
      this.getEmployeeDetail(this.employeeId);
    }
  }

  getEmployeeDetail(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (res) => {
        this.employeeInfo = res.result;
        this.handlePatch();
      },
      error: (error) => {},
    });
  }

  handlePatch() {
    this.employeeForm.patchValue({
      fullName: this.employeeInfo.fullName,
      employeeCode: this.employeeInfo.employeeCode,
      gender: this.employeeInfo.gender,
      dateOfBirth: this.formatDate(this.employeeInfo.dateOfBirth),
      email: this.employeeInfo.email,
      phoneNumber: this.employeeInfo.phoneNumber,
      departmentId: this.employeeInfo.departmentId,
      positionId: this.employeeInfo.positionId,
      salary: this.employeeInfo.salary,
      hireDate: this.formatDate(this.employeeInfo.hireDate),
    });
  }

  formatDate(date: any): string {
    if (!date) return '';

    const d = new Date(date);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  get f() {
    return this.employeeForm.controls;
  }

  getDepartmentList() {
    this.departmentService.getDepartmentList().subscribe({
      next: (res) => {
        this.departmentList = res;
      },
      error: (error) => {},
    });
  }

  getPositionList() {
    this.positionService.getPositionList().subscribe({
      next: (res) => {
        this.positionList = res;
      },
      error: (error) => {},
    });
  }

  cancelOnClicked() {
    this.activeModal.close();
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    let formValue = this.employeeForm.value;

    var data = {
      employeeId: 0,
      employeeCode: formValue.employeeCode,
      fullName: formValue.fullName,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      departmentId: formValue.departmentId,
      positionId: formValue.positionId,
      salary: formValue.salary,
      hireDate: formValue.hireDate,
      isActive: true,
    };

    Swal.fire({
      title: 'Are you sure to new employee?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
      if (result.isConfirmed) {
        this.employeeService.addEmployee(data).subscribe({
          next: (result) => {
            console.log('SUCCESS HIT', result);
            setTimeout(() => {
              Swal.fire({
                text: result.message,
                icon: 'success',
              }).then(() => {
                this.activeModal.close();
              });
            }, 200);
          },
          error: (err) => {
            console.log('DELETE ERROR:', err);

            setTimeout(() => {
              Swal.fire({
                text: err.error.message,
                icon: 'error',
              }).then(() => {});
            }, 200);
          },
        });
      }
    });
  }

  updateEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    let formValue = this.employeeForm.value;

    var data = {
      employeeId: this.employeeInfo.employeeId,
      employeeCode: formValue.employeeCode,
      fullName: formValue.fullName,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      departmentId: formValue.departmentId,
      positionId: formValue.positionId,
      salary: formValue.salary,
      hireDate: formValue.hireDate,
    };

    Swal.fire({
      title: 'Are you sure to update this employee information?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
      if (result.isConfirmed) {
        this.employeeService
          .updateEmployee(this.employeeInfo.employeeId, data)
          .subscribe({
            next: (result) => {
              console.log('SUCCESS HIT', result);
              setTimeout(() => {
                Swal.fire({
                  text: result.message,
                  icon: 'success',
                }).then(() => {
                  this.activeModal.close();
                });
              }, 200);
            },
            error: (err) => {
              console.log('DELETE ERROR:', err);

              setTimeout(() => {
                Swal.fire({
                  text: err.error.message,
                  icon: 'error',
                }).then(() => {});
              }, 200);
            },
          });
      }
    });
  }

  decimalInputOnChange2(e: any, formControl: any) {
    const value = e.target.value.replaceAll(',', '');
    const decimalValue = parseFloat(value);

    formControl?.setValue(decimalValue);
  }
}
