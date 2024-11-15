import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVigilantesComponent } from './crear-vigilantes.component';

describe('CrearVigilantesComponent', () => {
  let component: CrearVigilantesComponent;
  let fixture: ComponentFixture<CrearVigilantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearVigilantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearVigilantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
