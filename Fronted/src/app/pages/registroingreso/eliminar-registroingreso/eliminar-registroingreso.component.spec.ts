import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRegistroingresoComponent } from './eliminar-registroingreso.component';

describe('EliminarRegistroingresoComponent', () => {
  let component: EliminarRegistroingresoComponent;
  let fixture: ComponentFixture<EliminarRegistroingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRegistroingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarRegistroingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
