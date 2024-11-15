import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObjetoComponent } from './crear-objeto.component';

describe('CrearObjetoComponent', () => {
  let component: CrearObjetoComponent;
  let fixture: ComponentFixture<CrearObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearObjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
