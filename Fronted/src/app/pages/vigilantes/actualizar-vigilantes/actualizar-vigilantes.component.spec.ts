import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarVigilantesComponent } from './actualizar-vigilantes.component';

describe('ActualizarVigilantesComponent', () => {
  let component: ActualizarVigilantesComponent;
  let fixture: ComponentFixture<ActualizarVigilantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarVigilantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarVigilantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
