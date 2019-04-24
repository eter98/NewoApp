import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanding } from 'app/shared/model/landing.model';

type EntityResponseType = HttpResponse<ILanding>;
type EntityArrayResponseType = HttpResponse<ILanding[]>;

@Injectable({ providedIn: 'root' })
export class LandingService {
    public resourceUrl = SERVER_API_URL + 'api/landings';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/landings';

    constructor(protected http: HttpClient) {}

    create(landing: ILanding): Observable<EntityResponseType> {
        return this.http.post<ILanding>(this.resourceUrl, landing, { observe: 'response' });
    }

    update(landing: ILanding): Observable<EntityResponseType> {
        return this.http.put<ILanding>(this.resourceUrl, landing, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILanding>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanding[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILanding[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
