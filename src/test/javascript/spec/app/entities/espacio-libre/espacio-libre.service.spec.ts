/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EspacioLibreService } from 'app/entities/espacio-libre/espacio-libre.service';
import { IEspacioLibre, EspacioLibre } from 'app/shared/model/espacio-libre.model';

describe('Service Tests', () => {
    describe('EspacioLibre Service', () => {
        let injector: TestBed;
        let service: EspacioLibreService;
        let httpMock: HttpTestingController;
        let elemDefault: IEspacioLibre;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EspacioLibreService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new EspacioLibre(0, 0, 0, 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
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

            it('should create a EspacioLibre', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new EspacioLibre(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EspacioLibre', async () => {
                const returnedFromService = Object.assign(
                    {
                        capacidadInstalada: 1,
                        tipoDeEspacios: 1,
                        wifi: 'BBBBBB',
                        tarifa1hMiembro: 1,
                        tarifa2hMiembro: 1,
                        tarifa3hMiembro: 1,
                        tarifa4hMiembro: 1,
                        tarifa5hMiembro: 1,
                        tarifa6hMiembro: 1,
                        tarifa7hMiembro: 1,
                        tarifa8hMiembro: 1,
                        tarifa1hInvitado: 1,
                        tarifa2hInvitado: 1,
                        tarifa3hInvitado: 1,
                        tarifa4hInvitado: 1,
                        tarifa5hInvitado: 1,
                        tarifa6hInvitado: 1,
                        tarifa7hInvitado: 1,
                        tarifa8hInvitado: 1
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

            it('should return a list of EspacioLibre', async () => {
                const returnedFromService = Object.assign(
                    {
                        capacidadInstalada: 1,
                        tipoDeEspacios: 1,
                        wifi: 'BBBBBB',
                        tarifa1hMiembro: 1,
                        tarifa2hMiembro: 1,
                        tarifa3hMiembro: 1,
                        tarifa4hMiembro: 1,
                        tarifa5hMiembro: 1,
                        tarifa6hMiembro: 1,
                        tarifa7hMiembro: 1,
                        tarifa8hMiembro: 1,
                        tarifa1hInvitado: 1,
                        tarifa2hInvitado: 1,
                        tarifa3hInvitado: 1,
                        tarifa4hInvitado: 1,
                        tarifa5hInvitado: 1,
                        tarifa6hInvitado: 1,
                        tarifa7hInvitado: 1,
                        tarifa8hInvitado: 1
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

            it('should delete a EspacioLibre', async () => {
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
