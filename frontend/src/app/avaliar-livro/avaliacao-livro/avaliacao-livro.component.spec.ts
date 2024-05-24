import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoLivroComponent } from './avaliacao-livro.component';

describe('AvaliacaoLivroComponent', () => {
  let component: AvaliacaoLivroComponent;
  let fixture: ComponentFixture<AvaliacaoLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoLivroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliacaoLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
