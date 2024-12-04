import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentePage } from './docente.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ConsumoApiService } from 'src/app/service/consumoapi.service';

describe('DocentePage', () => {
  let component: DocentePage;
  let fixture: ComponentFixture<DocentePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocentePage],
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [ ConsumoApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
