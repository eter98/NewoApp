import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMiembros } from 'app/shared/model/miembros.model';

type EntityResponseType = HttpResponse<IMiembros>;
type EntityArrayResponseType = HttpResponse<IMiembros[]>;

@Injectable({ providedIn: 'root' })
export class MiembrosService {
    public resourceUrl = SERVER_API_URL + 'api/miembros';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/miembros';

    constructor(protected http: HttpClient) {}

    create(miembros: IMiembros): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(miembros);
        return this.http
            .post<IMiembros>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(miembros: IMiembros): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(miembros);
        return this.http
            .put<IMiembros>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMiembros>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMiembros[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMiembros[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(miembros: IMiembros): IMiembros {
        const copy: IMiembros = Object.assign({}, miembros, {
            fevhaNacimiento:
                miembros.fevhaNacimiento != null && miembros.fevhaNacimiento.isValid()
                    ? miembros.fevhaNacimiento.format(DATE_FORMAT)
                    : null,
            fechaRegistro:
                miembros.fechaRegistro != null && miembros.fechaRegistro.isValid() ? miembros.fechaRegistro.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fevhaNacimiento = res.body.fevhaNacimiento != null ? moment(res.body.fevhaNacimiento) : null;
            res.body.fechaRegistro = res.body.fechaRegistro != null ? moment(res.body.fechaRegistro) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((miembros: IMiembros) => {
                miembros.fevhaNacimiento = miembros.fevhaNacimiento != null ? moment(miembros.fevhaNacimiento) : null;
                miembros.fechaRegistro = miembros.fechaRegistro != null ? moment(miembros.fechaRegistro) : null;
            });
        }
        return res;
    }
}
