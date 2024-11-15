import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEstudiantesComponent } from './mostrar-estudiantes.component';

describe('MostrarEstudiantesComponent', () => {
  let component: MostrarEstudiantesComponent;
  let fixture: ComponentFixture<MostrarEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
