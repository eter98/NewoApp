import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHostSede } from 'app/shared/model/host-sede.model';

type EntityResponseType = HttpResponse<IHostSede>;
type EntityArrayResponseType = HttpResponse<IHostSede[]>;

@Injectable({ providedIn: 'root' })
export class HostSedeService {
    public resourceUrl = SERVER_API_URL + 'api/host-sedes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/host-sedes';

    constructor(protected http: HttpClient) {}

    create(hostSede: IHostSede): Observable<EntityResponseType> {
        return this.http.post<IHostSede>(this.resourceUrl, hostSede, { observe: 'response' });
    }

    update(hostSede: IHostSede): Observable<EntityResponseType> {
        return this.http.put<IHostSede>(this.resourceUrl, hostSede, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHostSede>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHostSede[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHostSede[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
