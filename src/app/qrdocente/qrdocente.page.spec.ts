import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrdocentePage } from './qrdocente.page';
import { HttpClientModule } from '@angular/common/http'; 
import { ConsumoApiService } from 'src/app/service/consumoapi.service';

describe('QrdocentePage', () => {
  let component: QrdocentePage;
  let fixture: ComponentFixture<QrdocentePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrdocentePage],
      imports: [HttpClientModule], 
      providers: [ConsumoApiService] 
    });

    fixture = TestBed.createComponent(QrdocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
