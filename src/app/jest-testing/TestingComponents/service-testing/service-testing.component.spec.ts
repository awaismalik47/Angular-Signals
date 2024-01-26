import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTestingComponent } from './service-testing.component';

describe('ServiceTestingComponent', () => {
  let component: ServiceTestingComponent;
  let fixture: ComponentFixture<ServiceTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTestingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
