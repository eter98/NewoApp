/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CuentaAsociadaService } from 'app/entities/cuenta-asociada/cuenta-asociada.service';
import { ICuentaAsociada, CuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

describe('Service Tests', () => {
    describe('CuentaAsociada Service', () => {
        let injector: TestBed;
        let service: CuentaAsociadaService;
        let httpMock: HttpTestingController;
        let elemDefault: ICuentaAsociada;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CuentaAsociadaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new CuentaAsociada(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaVencimiento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a CuentaAsociada', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        fechaVencimiento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaVencimiento: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new CuentaAsociada(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a CuentaAsociada', async () => {
                const returnedFromService = Object.assign(
                    {
                        identificaciontitular: 'BBBBBB',
                        correoTitular: 'BBBBBB',
                        nombreTitular: 'BBBBBB',
                        apellidoTitular: 'BBBBBB',
                        numeroCuenta: 'BBBBBB',
                        tipoCuenta: 'BBBBBB',
                        codigoSeguridad: 'BBBBBB',
                        fechaVencimiento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fechaVencimiento: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of CuentaAsociada', async () => {
                const returnedFromService = Object.assign(
                    {
                        identificaciontitular: 'BBBBBB',
                        correoTitular: 'BBBBBB',
                        nombreTitular: 'BBBBBB',
                        apellidoTitular: 'BBBBBB',
                        numeroCuenta: 'BBBBBB',
                        tipoCuenta: 'BBBBBB',
                        codigoSeguridad: 'BBBBBB',
                        fechaVencimiento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaVencimiento: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a CuentaAsociada', async () => {
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
