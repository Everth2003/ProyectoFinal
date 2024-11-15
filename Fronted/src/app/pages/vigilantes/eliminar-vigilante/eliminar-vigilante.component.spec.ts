import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarVigilanteComponent } from './eliminar-vigilante.component';

describe('EliminarVigilanteComponent', () => {
  let component: EliminarVigilanteComponent;
  let fixture: ComponentFixture<EliminarVigilanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarVigilanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarVigilanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
