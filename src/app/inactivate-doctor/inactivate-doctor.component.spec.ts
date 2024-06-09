import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivateDoctorComponent } from './inactivate-doctor.component';

describe('InactivateDoctorComponent', () => {
  let component: InactivateDoctorComponent;
  let fixture: ComponentFixture<InactivateDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactivateDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InactivateDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
