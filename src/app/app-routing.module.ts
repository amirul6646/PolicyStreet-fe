import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponentComponent } from './pages/employee/employee-list-component/employee-list-component.component';

const routes: Routes = [
  {path: '', component: EmployeeListComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
