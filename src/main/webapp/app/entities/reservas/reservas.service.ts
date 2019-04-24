import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReservas } from 'app/shared/model/reservas.model';

type EntityResponseType = HttpResponse<IReservas>;
type EntityArrayResponseType = HttpResponse<IReservas[]>;

@Injectable({ providedIn: 'root' })
export class ReservasService {
    public resourceUrl = SERVER_API_URL + 'api/reservas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/reservas';

    constructor(protected http: HttpClient) {}

    create(reservas: IReservas): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reservas);
        return this.http
            .post<IReservas>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reservas: IReservas): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reservas);
        return this.http
            .put<IReservas>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReservas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReservas[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReservas[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(reservas: IReservas): IReservas {
        const copy: IReservas = Object.assign({}, reservas, {
            fechaEntrada:
                reservas.fechaEntrada != null && reservas.fechaEntrada.isValid() ? reservas.fechaEntrada.format(DATE_FORMAT) : null,
            fechaSalida: reservas.fechaSalida != null && reservas.fechaSalida.isValid() ? reservas.fechaSalida.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaEntrada = res.body.fechaEntrada != null ? moment(res.body.fechaEntrada) : null;
            res.body.fechaSalida = res.body.fechaSalida != null ? moment(res.body.fechaSalida) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((reservas: IReservas) => {
                reservas.fechaEntrada = reservas.fechaEntrada != null ? moment(reservas.fechaEntrada) : null;
                reservas.fechaSalida = reservas.fechaSalida != null ? moment(reservas.fechaSalida) : null;
            });
        }
        return res;
    }
}
