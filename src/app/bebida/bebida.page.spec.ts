import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebidaPage } from './bebida.page';

describe('BebidaPage', () => {
  let component: BebidaPage;
  let fixture: ComponentFixture<BebidaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BebidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
