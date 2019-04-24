import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISedes } from 'app/shared/model/sedes.model';

type EntityResponseType = HttpResponse<ISedes>;
type EntityArrayResponseType = HttpResponse<ISedes[]>;

@Injectable({ providedIn: 'root' })
export class SedesService {
    public resourceUrl = SERVER_API_URL + 'api/sedes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/sedes';

    constructor(protected http: HttpClient) {}

    create(sedes: ISedes): Observable<EntityResponseType> {
        return this.http.post<ISedes>(this.resourceUrl, sedes, { observe: 'response' });
    }

    update(sedes: ISedes): Observable<EntityResponseType> {
        return this.http.put<ISedes>(this.resourceUrl, sedes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISedes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISedes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISedes[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
