import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarVigilantesComponent } from './mostrar-vigilantes.component';

describe('MostrarVigilantesComponent', () => {
  let component: MostrarVigilantesComponent;
  let fixture: ComponentFixture<MostrarVigilantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarVigilantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarVigilantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
