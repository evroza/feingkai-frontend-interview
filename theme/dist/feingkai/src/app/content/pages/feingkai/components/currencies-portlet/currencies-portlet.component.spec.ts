import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesPortletComponent } from './currencies-portlet.component';

describe('CurrenciesPortletComponent', () => {
  let component: CurrenciesPortletComponent;
  let fixture: ComponentFixture<CurrenciesPortletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesPortletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});