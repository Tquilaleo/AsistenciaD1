import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrdocentePage } from './qrdocente.page';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { ConsumoApiService } from 'src/app/service/consumoapi.service';

describe('QrdocentePage', () => {
  let component: QrdocentePage;
  let fixture: ComponentFixture<QrdocentePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrdocentePage],
      imports: [HttpClientModule], // Agrega HttpClientModule aquí
      providers: [ConsumoApiService] // Si tu componente usa ConsumoApiService, lo necesitas en providers
    });

    fixture = TestBed.createComponent(QrdocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
