import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireMe } from './hire-me';

describe('HireMe', () => {
  let component: HireMe;
  let fixture: ComponentFixture<HireMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireMe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
