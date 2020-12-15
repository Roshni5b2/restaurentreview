import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincoffeeshopComponent } from './maincoffeeshop.component';

describe('MaincoffeeshopComponent', () => {
  let component: MaincoffeeshopComponent;
  let fixture: ComponentFixture<MaincoffeeshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaincoffeeshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincoffeeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
