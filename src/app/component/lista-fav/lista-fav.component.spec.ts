import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFavComponent } from './lista-fav.component';

describe('ListaFavComponent', () => {
  let component: ListaFavComponent;
  let fixture: ComponentFixture<ListaFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
