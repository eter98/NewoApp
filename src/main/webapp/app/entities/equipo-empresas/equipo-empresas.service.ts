import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

type EntityResponseType = HttpResponse<IEquipoEmpresas>;
type EntityArrayResponseType = HttpResponse<IEquipoEmpresas[]>;

@Injectable({ providedIn: 'root' })
export class EquipoEmpresasService {
    public resourceUrl = SERVER_API_URL + 'api/equipo-empresas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/equipo-empresas';

    constructor(protected http: HttpClient) {}

    create(equipoEmpresas: IEquipoEmpresas): Observable<EntityResponseType> {
        return this.http.post<IEquipoEmpresas>(this.resourceUrl, equipoEmpresas, { observe: 'response' });
    }

    update(equipoEmpresas: IEquipoEmpresas): Observable<EntityResponseType> {
        return this.http.put<IEquipoEmpresas>(this.resourceUrl, equipoEmpresas, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEquipoEmpresas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEquipoEmpresas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEquipoEmpresas[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
