import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateEmployeeComponentComponent } from './insert-update-employee-component.component';

describe('InsertUpdateEmployeeComponentComponent', () => {
  let component: InsertUpdateEmployeeComponentComponent;
  let fixture: ComponentFixture<InsertUpdateEmployeeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateEmployeeComponentComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateEmployeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
