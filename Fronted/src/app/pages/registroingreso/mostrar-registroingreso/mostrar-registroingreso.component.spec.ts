import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRegistroingresoComponent } from './mostrar-registroingreso.component';

describe('MostrarRegistroingresoComponent', () => {
  let component: MostrarRegistroingresoComponent;
  let fixture: ComponentFixture<MostrarRegistroingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRegistroingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarRegistroingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
