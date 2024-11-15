import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroingresoComponent } from './registroingreso.component';

describe('RegistroingresoComponent', () => {
  let component: RegistroingresoComponent;
  let fixture: ComponentFixture<RegistroingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
