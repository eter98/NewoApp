import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';

type EntityResponseType = HttpResponse<IEntradaMiembros>;
type EntityArrayResponseType = HttpResponse<IEntradaMiembros[]>;

@Injectable({ providedIn: 'root' })
export class EntradaMiembrosService {
    public resourceUrl = SERVER_API_URL + 'api/entrada-miembros';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/entrada-miembros';

    constructor(protected http: HttpClient) {}

    create(entradaMiembros: IEntradaMiembros): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(entradaMiembros);
        return this.http
            .post<IEntradaMiembros>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(entradaMiembros: IEntradaMiembros): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(entradaMiembros);
        return this.http
            .put<IEntradaMiembros>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEntradaMiembros>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEntradaMiembros[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEntradaMiembros[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(entradaMiembros: IEntradaMiembros): IEntradaMiembros {
        const copy: IEntradaMiembros = Object.assign({}, entradaMiembros, {
            fechaEntrada:
                entradaMiembros.fechaEntrada != null && entradaMiembros.fechaEntrada.isValid()
                    ? entradaMiembros.fechaEntrada.format(DATE_FORMAT)
                    : null,
            fechaSalida:
                entradaMiembros.fechaSalida != null && entradaMiembros.fechaSalida.isValid()
                    ? entradaMiembros.fechaSalida.format(DATE_FORMAT)
                    : null
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
            res.body.forEach((entradaMiembros: IEntradaMiembros) => {
                entradaMiembros.fechaEntrada = entradaMiembros.fechaEntrada != null ? moment(entradaMiembros.fechaEntrada) : null;
                entradaMiembros.fechaSalida = entradaMiembros.fechaSalida != null ? moment(entradaMiembros.fechaSalida) : null;
            });
        }
        return res;
    }
}
