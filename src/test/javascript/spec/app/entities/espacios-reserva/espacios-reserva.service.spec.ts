/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { EspaciosReservaService } from 'app/entities/espacios-reserva/espacios-reserva.service';
import { IEspaciosReserva, EspaciosReserva } from 'app/shared/model/espacios-reserva.model';

describe('Service Tests', () => {
    describe('EspaciosReserva Service', () => {
        let injector: TestBed;
        let service: EspaciosReservaService;
        let httpMock: HttpTestingController;
        let elemDefault: IEspaciosReserva;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EspaciosReservaService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new EspaciosReserva(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'AAAAAAA', 'AAAAAAA');
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

            it('should create a EspaciosReserva', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new EspaciosReserva(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a EspaciosReserva', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        facilidades: 'BBBBBB',
                        capacidad: 1,
                        tarifa1Hora: 1,
                        tarifa2Hora: 1,
                        tarifa3Hora: 1,
                        tarifa4Hora: 1,
                        tarifa5Hora: 1,
                        tarifa6Hora: 1,
                        tarifa7Hora: 1,
                        tarifa8Hora: 1,
                        horario: 'BBBBBB',
                        wifi: 'BBBBBB'
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

            it('should return a list of EspaciosReserva', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        descripcion: 'BBBBBB',
                        facilidades: 'BBBBBB',
                        capacidad: 1,
                        tarifa1Hora: 1,
                        tarifa2Hora: 1,
                        tarifa3Hora: 1,
                        tarifa4Hora: 1,
                        tarifa5Hora: 1,
                        tarifa6Hora: 1,
                        tarifa7Hora: 1,
                        tarifa8Hora: 1,
                        horario: 'BBBBBB',
                        wifi: 'BBBBBB'
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

            it('should delete a EspaciosReserva', async () => {
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
