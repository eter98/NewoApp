import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

type EntityResponseType = HttpResponse<ICuentaAsociada>;
type EntityArrayResponseType = HttpResponse<ICuentaAsociada[]>;

@Injectable({ providedIn: 'root' })
export class CuentaAsociadaService {
    public resourceUrl = SERVER_API_URL + 'api/cuenta-asociadas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/cuenta-asociadas';

    constructor(protected http: HttpClient) {}

    create(cuentaAsociada: ICuentaAsociada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cuentaAsociada);
        return this.http
            .post<ICuentaAsociada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cuentaAsociada: ICuentaAsociada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cuentaAsociada);
        return this.http
            .put<ICuentaAsociada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICuentaAsociada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICuentaAsociada[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICuentaAsociada[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(cuentaAsociada: ICuentaAsociada): ICuentaAsociada {
        const copy: ICuentaAsociada = Object.assign({}, cuentaAsociada, {
            fechaVencimiento:
                cuentaAsociada.fechaVencimiento != null && cuentaAsociada.fechaVencimiento.isValid()
                    ? cuentaAsociada.fechaVencimiento.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaVencimiento = res.body.fechaVencimiento != null ? moment(res.body.fechaVencimiento) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((cuentaAsociada: ICuentaAsociada) => {
                cuentaAsociada.fechaVencimiento = cuentaAsociada.fechaVencimiento != null ? moment(cuentaAsociada.fechaVencimiento) : null;
            });
        }
        return res;
    }
}
