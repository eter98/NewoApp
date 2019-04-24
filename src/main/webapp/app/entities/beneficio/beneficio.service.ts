import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBeneficio } from 'app/shared/model/beneficio.model';

type EntityResponseType = HttpResponse<IBeneficio>;
type EntityArrayResponseType = HttpResponse<IBeneficio[]>;

@Injectable({ providedIn: 'root' })
export class BeneficioService {
    public resourceUrl = SERVER_API_URL + 'api/beneficios';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/beneficios';

    constructor(protected http: HttpClient) {}

    create(beneficio: IBeneficio): Observable<EntityResponseType> {
        return this.http.post<IBeneficio>(this.resourceUrl, beneficio, { observe: 'response' });
    }

    update(beneficio: IBeneficio): Observable<EntityResponseType> {
        return this.http.put<IBeneficio>(this.resourceUrl, beneficio, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBeneficio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBeneficio[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBeneficio[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
