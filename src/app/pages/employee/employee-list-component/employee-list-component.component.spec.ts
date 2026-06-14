import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponentComponent } from './employee-list-component.component';

describe('EmployeeListComponentComponent', () => {
  let component: EmployeeListComponentComponent;
  let fixture: ComponentFixture<EmployeeListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponentComponent]
    });
    fixture = TestBed.createComponent(EmployeeListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
