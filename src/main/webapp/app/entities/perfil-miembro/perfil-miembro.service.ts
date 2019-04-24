import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';

type EntityResponseType = HttpResponse<IPerfilMiembro>;
type EntityArrayResponseType = HttpResponse<IPerfilMiembro[]>;

@Injectable({ providedIn: 'root' })
export class PerfilMiembroService {
    public resourceUrl = SERVER_API_URL + 'api/perfil-miembros';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/perfil-miembros';

    constructor(protected http: HttpClient) {}

    create(perfilMiembro: IPerfilMiembro): Observable<EntityResponseType> {
        return this.http.post<IPerfilMiembro>(this.resourceUrl, perfilMiembro, { observe: 'response' });
    }

    update(perfilMiembro: IPerfilMiembro): Observable<EntityResponseType> {
        return this.http.put<IPerfilMiembro>(this.resourceUrl, perfilMiembro, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerfilMiembro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerfilMiembro[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerfilMiembro[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
