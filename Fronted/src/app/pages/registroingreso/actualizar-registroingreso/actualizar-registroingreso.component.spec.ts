import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRegistroingresoComponent } from './actualizar-registroingreso.component';

describe('ActualizarRegistroingresoComponent', () => {
  let component: ActualizarRegistroingresoComponent;
  let fixture: ComponentFixture<ActualizarRegistroingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRegistroingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarRegistroingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
