import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntocontroComponent } from './puntocontro.component';

describe('PuntocontroComponent', () => {
  let component: PuntocontroComponent;
  let fixture: ComponentFixture<PuntocontroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntocontroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntocontroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
