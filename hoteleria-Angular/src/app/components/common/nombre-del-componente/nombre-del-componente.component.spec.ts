import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreDelComponenteComponent } from './nombre-del-componente.component';

describe('NombreDelComponenteComponent', () => {
  let component: NombreDelComponenteComponent;
  let fixture: ComponentFixture<NombreDelComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NombreDelComponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NombreDelComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
