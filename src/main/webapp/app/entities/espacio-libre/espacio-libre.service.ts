import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';

type EntityResponseType = HttpResponse<IEspacioLibre>;
type EntityArrayResponseType = HttpResponse<IEspacioLibre[]>;

@Injectable({ providedIn: 'root' })
export class EspacioLibreService {
    public resourceUrl = SERVER_API_URL + 'api/espacio-libres';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/espacio-libres';

    constructor(protected http: HttpClient) {}

    create(espacioLibre: IEspacioLibre): Observable<EntityResponseType> {
        return this.http.post<IEspacioLibre>(this.resourceUrl, espacioLibre, { observe: 'response' });
    }

    update(espacioLibre: IEspacioLibre): Observable<EntityResponseType> {
        return this.http.put<IEspacioLibre>(this.resourceUrl, espacioLibre, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEspacioLibre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspacioLibre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspacioLibre[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
