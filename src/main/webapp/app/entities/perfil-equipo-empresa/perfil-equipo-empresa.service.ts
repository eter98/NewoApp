import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

type EntityResponseType = HttpResponse<IPerfilEquipoEmpresa>;
type EntityArrayResponseType = HttpResponse<IPerfilEquipoEmpresa[]>;

@Injectable({ providedIn: 'root' })
export class PerfilEquipoEmpresaService {
    public resourceUrl = SERVER_API_URL + 'api/perfil-equipo-empresas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/perfil-equipo-empresas';

    constructor(protected http: HttpClient) {}

    create(perfilEquipoEmpresa: IPerfilEquipoEmpresa): Observable<EntityResponseType> {
        return this.http.post<IPerfilEquipoEmpresa>(this.resourceUrl, perfilEquipoEmpresa, { observe: 'response' });
    }

    update(perfilEquipoEmpresa: IPerfilEquipoEmpresa): Observable<EntityResponseType> {
        return this.http.put<IPerfilEquipoEmpresa>(this.resourceUrl, perfilEquipoEmpresa, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerfilEquipoEmpresa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerfilEquipoEmpresa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerfilEquipoEmpresa[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
