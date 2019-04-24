/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PerfilEquipoEmpresaService } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa.service';
import { IPerfilEquipoEmpresa, PerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

describe('Service Tests', () => {
    describe('PerfilEquipoEmpresa Service', () => {
        let injector: TestBed;
        let service: PerfilEquipoEmpresaService;
        let httpMock: HttpTestingController;
        let elemDefault: IPerfilEquipoEmpresa;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PerfilEquipoEmpresaService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PerfilEquipoEmpresa(0, 'AAAAAAA', 'AAAAAAA', 0, 0, 0);
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

            it('should create a PerfilEquipoEmpresa', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PerfilEquipoEmpresa(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PerfilEquipoEmpresa', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        inventariable: 1,
                        valor: 1,
                        impuesto: 1
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

            it('should return a list of PerfilEquipoEmpresa', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        inventariable: 1,
                        valor: 1,
                        impuesto: 1
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

            it('should delete a PerfilEquipoEmpresa', async () => {
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
