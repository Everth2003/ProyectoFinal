import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigilantesComponent } from './vigilantes.component';

describe('VigilantesComponent', () => {
  let component: VigilantesComponent;
  let fixture: ComponentFixture<VigilantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VigilantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VigilantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
