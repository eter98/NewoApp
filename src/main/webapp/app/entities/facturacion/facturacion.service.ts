import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFacturacion } from 'app/shared/model/facturacion.model';

type EntityResponseType = HttpResponse<IFacturacion>;
type EntityArrayResponseType = HttpResponse<IFacturacion[]>;

@Injectable({ providedIn: 'root' })
export class FacturacionService {
    public resourceUrl = SERVER_API_URL + 'api/facturacions';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/facturacions';

    constructor(protected http: HttpClient) {}

    create(facturacion: IFacturacion): Observable<EntityResponseType> {
        return this.http.post<IFacturacion>(this.resourceUrl, facturacion, { observe: 'response' });
    }

    update(facturacion: IFacturacion): Observable<EntityResponseType> {
        return this.http.put<IFacturacion>(this.resourceUrl, facturacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFacturacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFacturacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFacturacion[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
