/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EntradaMiembrosService } from 'app/entities/entrada-miembros/entrada-miembros.service';
import { IEntradaMiembros, EntradaMiembros } from 'app/shared/model/entrada-miembros.model';

describe('Service Tests', () => {
    describe('EntradaMiembros Service', () => {
        let injector: TestBed;
        let service: EntradaMiembrosService;
        let httpMock: HttpTestingController;
        let elemDefault: IEntradaMiembros;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EntradaMiembrosService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new EntradaMiembros(0, currentDate, currentDate);
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

            it('should create a EntradaMiembros', async () => {
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
                    .create(new EntradaMiembros(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EntradaMiembros', async () => {
                const returnedFromService = Object.assign(
                    {
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
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of EntradaMiembros', async () => {
                const returnedFromService = Object.assign(
                    {
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

            it('should delete a EntradaMiembros', async () => {
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
