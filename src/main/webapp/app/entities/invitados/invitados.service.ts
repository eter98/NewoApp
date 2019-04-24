import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvitados } from 'app/shared/model/invitados.model';

type EntityResponseType = HttpResponse<IInvitados>;
type EntityArrayResponseType = HttpResponse<IInvitados[]>;

@Injectable({ providedIn: 'root' })
export class InvitadosService {
    public resourceUrl = SERVER_API_URL + 'api/invitados';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/invitados';

    constructor(protected http: HttpClient) {}

    create(invitados: IInvitados): Observable<EntityResponseType> {
        return this.http.post<IInvitados>(this.resourceUrl, invitados, { observe: 'response' });
    }

    update(invitados: IInvitados): Observable<EntityResponseType> {
        return this.http.put<IInvitados>(this.resourceUrl, invitados, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInvitados>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInvitados[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInvitados[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
