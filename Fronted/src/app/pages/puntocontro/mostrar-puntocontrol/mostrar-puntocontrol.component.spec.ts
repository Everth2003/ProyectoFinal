import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPuntocontrolComponent } from './mostrar-puntocontrol.component';

describe('MostrarPuntocontrolComponent', () => {
  let component: MostrarPuntocontrolComponent;
  let fixture: ComponentFixture<MostrarPuntocontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPuntocontrolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarPuntocontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
