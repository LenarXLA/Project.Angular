import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainArticlePageComponent } from './main-article-page.component';

describe('MainArticlePageComponent', () => {
  let component: MainArticlePageComponent;
  let fixture: ComponentFixture<MainArticlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainArticlePageComponent]
    });
    fixture = TestBed.createComponent(MainArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
