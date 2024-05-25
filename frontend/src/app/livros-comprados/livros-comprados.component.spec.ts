import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosCompradosComponent } from './livros-comprados.component';

describe('LivrosCompradosComponent', () => {
  let component: LivrosCompradosComponent;
  let fixture: ComponentFixture<LivrosCompradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosCompradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivrosCompradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
