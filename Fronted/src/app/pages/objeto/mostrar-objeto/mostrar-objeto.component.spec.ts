import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarObjetoComponent } from './mostrar-objeto.component';

describe('MostrarObjetoComponent', () => {
  let component: MostrarObjetoComponent;
  let fixture: ComponentFixture<MostrarObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarObjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
