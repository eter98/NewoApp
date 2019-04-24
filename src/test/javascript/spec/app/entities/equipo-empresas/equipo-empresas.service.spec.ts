/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas/equipo-empresas.service';
import { IEquipoEmpresas, EquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

describe('Service Tests', () => {
    describe('EquipoEmpresas Service', () => {
        let injector: TestBed;
        let service: EquipoEmpresasService;
        let httpMock: HttpTestingController;
        let elemDefault: IEquipoEmpresas;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EquipoEmpresasService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new EquipoEmpresas(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'image/png', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a EquipoEmpresas', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new EquipoEmpresas(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EquipoEmpresas', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        telefono: 'BBBBBB',
                        correo: 'BBBBBB',
                        direccion: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        logos: 'BBBBBB',
                        paginaWeb: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of EquipoEmpresas', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        telefono: 'BBBBBB',
                        correo: 'BBBBBB',
                        direccion: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        logos: 'BBBBBB',
                        paginaWeb: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a EquipoEmpresas', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
