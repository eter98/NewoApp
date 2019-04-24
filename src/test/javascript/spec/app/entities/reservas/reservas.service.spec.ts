/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ReservasService } from 'app/entities/reservas/reservas.service';
import { IReservas, Reservas } from 'app/shared/model/reservas.model';

describe('Service Tests', () => {
    describe('Reservas Service', () => {
        let injector: TestBed;
        let service: ReservasService;
        let httpMock: HttpTestingController;
        let elemDefault: IReservas;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ReservasService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Reservas(0, currentDate, 'AAAAAAA', currentDate, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaEntrada: currentDate.format(DATE_FORMAT),
                        fechaSalida: currentDate.format(DATE_FORMAT)
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

            it('should create a Reservas', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        fechaEntrada: currentDate.format(DATE_FORMAT),
                        fechaSalida: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEntrada: currentDate,
                        fechaSalida: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Reservas(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Reservas', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaEntrada: currentDate.format(DATE_FORMAT),
                        horaEntrada: 'BBBBBB',
                        fechaSalida: currentDate.format(DATE_FORMAT),
                        horaSalida: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fechaEntrada: currentDate,
                        fechaSalida: currentDate
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

            it('should return a list of Reservas', async () => {
                const returnedFromService = Object.assign(
                    {
                        fechaEntrada: currentDate.format(DATE_FORMAT),
                        horaEntrada: 'BBBBBB',
                        fechaSalida: currentDate.format(DATE_FORMAT),
                        horaSalida: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fechaEntrada: currentDate,
                        fechaSalida: currentDate
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

            it('should delete a Reservas', async () => {
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
