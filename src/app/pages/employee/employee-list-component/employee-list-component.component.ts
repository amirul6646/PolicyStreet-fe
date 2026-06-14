import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsertUpdateEmployeeComponentComponent } from 'src/app/component/insert-update-employee-component/insert-update-employee-component.component';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-employee-list-component',
  templateUrl: './employee-list-component.component.html',
  styleUrls: ['./employee-list-component.component.scss'],
})
export class EmployeeListComponentComponent {
  employees: any[] = [];
  departmentList: any = [];
  positionList: any = [];

  page: number = 1;
  pageSize: number = 5;

  searchField: any = {
    fullName: '',
    employeeCode: '',
    departmentId: 0,
    positionId: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getEmployeeList();
    this.getDepartmentList();
    this.getPositionList();
  }

  getEmployeeList() {
    this.employeeService.getEmployeeList(this.searchField).subscribe({
      next: (res) => {
        this.employees = res.result;
      },
      error: (error) => {},
    });
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

  search() {
    this.page = 1;
    this.getEmployeeList();
  }

  reset() {
    this.searchField = {
      fullName: '',
      employeeCode: '',
      departmentId: 0,
      positionId: 0,
    };
    this.page = 1;

    this.getEmployeeList();
  }

  get pagedData() {
    const start = (this.page - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  // openEmployeeModal(employee?: any) {
  //   const modalRef = this.modalService.open(
  //     InsertUpdateEmployeeComponentComponent,
  //   );

  //   modalRef.componentInstance.employee = employee;
  // }

  openModal() {
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('employeeModal'),
    );

    modal.show();
  }

  addUpdateMember(mode: string,employeeId?: number) {
    const modalRef = this.modalService.open(
      InsertUpdateEmployeeComponentComponent,
      {
        size: 'xl',
      },
    );

    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.employeeId = employeeId;

    modalRef.result.then(
      (result) => {
        this.getEmployeeList();
      },
      (reason) => {},
    );
  }

  deleteEmployee(employeeId: number) {
    Swal.fire({
      title: 'Are you sure?',
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
        this.employeeService.deleteEmployee(employeeId).subscribe({
          next: (result) => {
            setTimeout(() => {
              Swal.fire({
                text: result.message,
                icon: 'success',
              }).then(() => {
                this.getEmployeeList();
              });
            }, 200);
          },
         error: (err) => {
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
}
