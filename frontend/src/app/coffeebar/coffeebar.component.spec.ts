import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeebarComponent } from './coffeebar.component';

describe('CoffeebarComponent', () => {
  let component: CoffeebarComponent;
  let fixture: ComponentFixture<CoffeebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
