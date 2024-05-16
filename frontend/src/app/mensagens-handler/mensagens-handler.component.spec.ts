import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagensHandlerComponent } from './mensagens-handler.component';

describe('MensagensHandlerComponent', () => {
  let component: MensagensHandlerComponent;
  let fixture: ComponentFixture<MensagensHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagensHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensagensHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
