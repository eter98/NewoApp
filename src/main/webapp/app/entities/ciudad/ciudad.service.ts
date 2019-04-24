import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICiudad } from 'app/shared/model/ciudad.model';

type EntityResponseType = HttpResponse<ICiudad>;
type EntityArrayResponseType = HttpResponse<ICiudad[]>;

@Injectable({ providedIn: 'root' })
export class CiudadService {
    public resourceUrl = SERVER_API_URL + 'api/ciudads';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/ciudads';

    constructor(protected http: HttpClient) {}

    create(ciudad: ICiudad): Observable<EntityResponseType> {
        return this.http.post<ICiudad>(this.resourceUrl, ciudad, { observe: 'response' });
    }

    update(ciudad: ICiudad): Observable<EntityResponseType> {
        return this.http.put<ICiudad>(this.resourceUrl, ciudad, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICiudad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICiudad[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICiudad[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
