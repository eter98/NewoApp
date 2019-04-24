import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';

type EntityResponseType = HttpResponse<ITarifaLanding>;
type EntityArrayResponseType = HttpResponse<ITarifaLanding[]>;

@Injectable({ providedIn: 'root' })
export class TarifaLandingService {
    public resourceUrl = SERVER_API_URL + 'api/tarifa-landings';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tarifa-landings';

    constructor(protected http: HttpClient) {}

    create(tarifaLanding: ITarifaLanding): Observable<EntityResponseType> {
        return this.http.post<ITarifaLanding>(this.resourceUrl, tarifaLanding, { observe: 'response' });
    }

    update(tarifaLanding: ITarifaLanding): Observable<EntityResponseType> {
        return this.http.put<ITarifaLanding>(this.resourceUrl, tarifaLanding, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITarifaLanding>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITarifaLanding[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITarifaLanding[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
