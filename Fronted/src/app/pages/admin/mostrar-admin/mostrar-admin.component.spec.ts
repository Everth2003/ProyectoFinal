import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAdminComponent } from './mostrar-admin.component';

describe('MostrarAdminComponent', () => {
  let component: MostrarAdminComponent;
  let fixture: ComponentFixture<MostrarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
