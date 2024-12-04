import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoPage } from './alumno.page'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ConsumoApiService } from 'src/app/service/consumoapi.service';

describe('AlumnoPage', () => {
  let component: AlumnoPage;
  let fixture: ComponentFixture<AlumnoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnoPage],
      imports: [
        HttpClientTestingModule, 
      ],
      providers: [ConsumoApiService], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
