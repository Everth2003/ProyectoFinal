import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistroingresoComponent } from './crear-registroingreso.component';

describe('CrearRegistroingresoComponent', () => {
  let component: CrearRegistroingresoComponent;
  let fixture: ComponentFixture<CrearRegistroingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRegistroingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearRegistroingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
