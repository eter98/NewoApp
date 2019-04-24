import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';

type EntityResponseType = HttpResponse<IEntradaInvitados>;
type EntityArrayResponseType = HttpResponse<IEntradaInvitados[]>;

@Injectable({ providedIn: 'root' })
export class EntradaInvitadosService {
    public resourceUrl = SERVER_API_URL + 'api/entrada-invitados';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/entrada-invitados';

    constructor(protected http: HttpClient) {}

    create(entradaInvitados: IEntradaInvitados): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(entradaInvitados);
        return this.http
            .post<IEntradaInvitados>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(entradaInvitados: IEntradaInvitados): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(entradaInvitados);
        return this.http
            .put<IEntradaInvitados>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEntradaInvitados>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEntradaInvitados[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEntradaInvitados[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(entradaInvitados: IEntradaInvitados): IEntradaInvitados {
        const copy: IEntradaInvitados = Object.assign({}, entradaInvitados, {
            fechaEntrada:
                entradaInvitados.fechaEntrada != null && entradaInvitados.fechaEntrada.isValid()
                    ? entradaInvitados.fechaEntrada.format(DATE_FORMAT)
                    : null,
            fechaSalida:
                entradaInvitados.fechaSalida != null && entradaInvitados.fechaSalida.isValid()
                    ? entradaInvitados.fechaSalida.format(DATE_FORMAT)
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
            res.body.forEach((entradaInvitados: IEntradaInvitados) => {
                entradaInvitados.fechaEntrada = entradaInvitados.fechaEntrada != null ? moment(entradaInvitados.fechaEntrada) : null;
                entradaInvitados.fechaSalida = entradaInvitados.fechaSalida != null ? moment(entradaInvitados.fechaSalida) : null;
            });
        }
        return res;
    }
}
