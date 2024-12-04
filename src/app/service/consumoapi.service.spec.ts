import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsumoApiService } from './consumoapi.service';

describe('ConsumoApiService', () => {
  let service: ConsumoApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsumoApiService]
    });
    service = TestBed.inject(ConsumoApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // 1. Prueba de Creación del Servicio
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 2. Prueba de Login Exitoso
  it('should return a token, role, name and professor id on login', () => {
    const mockResponse = { token: '123', role: 'admin', nombre: 'John', id_profesor: 1 };
    
    service.login('test@example.com', 'password').subscribe(response => {
      expect(response.token).toBe('123');
      expect(response.role).toBe('admin');
      expect(response.nombre).toBe('John');
      expect(response.id_profesor).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // 3. Prueba de Error en Login
  it('should handle login error correctly', () => {
    const mockError = { status: 400, statusText: 'Bad Request' };
    
    service.login('test@example.com', 'wrongpassword').subscribe({
      next: () => fail('expected an error, not data'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/login');
    req.flush(null, mockError);
  });

  // 4. Prueba de Obtener Cursos del Profesor
  it('should return courses of the professor', () => {
    const mockCourses = [{ id: 1, name: 'Mathematics' }, { id: 2, name: 'Physics' }];
    
    service.Obtenercurso(1).subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0].name).toBe('Mathematics');
      expect(response[1].name).toBe('Physics');
    });

    const req = httpMock.expectOne('http://localhost:3000/profesores/1/cursos');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // 5. Prueba de Error al Obtener Cursos
  it('should handle error when getting courses', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.Obtenercurso(1).subscribe({
      next: () => fail('expected an error, not data'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/profesores/1/cursos');
    req.flush(null, mockError);
  });

  // 6. Prueba de Obtener Alumnos
  it('should return students of the professor\'s course', () => {
    const mockStudents = [{ id: 1, nombre: 'Alice' }, { id: 2, nombre: 'Bob' }];
    
    service.ObtenerAlumnos(1, 101).subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0].nombre).toBe('Alice');
      expect(response[1].nombre).toBe('Bob');
    });

    const req = httpMock.expectOne('http://localhost:3000/profesores/1/cursos/101/alumnos');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents);
  });

  // 7. Prueba de Error al Obtener Alumnos
  it('should handle error when getting students', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service.ObtenerAlumnos(1, 101).subscribe({
      next: () => fail('expected an error, not data'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/profesores/1/cursos/101/alumnos');
    req.flush(null, mockError);
  });

  // 8. Prueba de Verificación de URL del API
  it('should use the correct URL for login', () => {
    const mockResponse = { token: '123', role: 'admin', nombre: 'John', id_profesor: 1 };

    service.login('test@example.com', 'password').subscribe(response => {
      expect(response.token).toBe('123');
      expect(response.role).toBe('admin');
    });

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
