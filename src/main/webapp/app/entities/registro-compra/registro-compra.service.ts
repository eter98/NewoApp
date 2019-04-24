import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';

type EntityResponseType = HttpResponse<IRegistroCompra>;
type EntityArrayResponseType = HttpResponse<IRegistroCompra[]>;

@Injectable({ providedIn: 'root' })
export class RegistroCompraService {
    public resourceUrl = SERVER_API_URL + 'api/registro-compras';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/registro-compras';

    constructor(protected http: HttpClient) {}

    create(registroCompra: IRegistroCompra): Observable<EntityResponseType> {
        return this.http.post<IRegistroCompra>(this.resourceUrl, registroCompra, { observe: 'response' });
    }

    update(registroCompra: IRegistroCompra): Observable<EntityResponseType> {
        return this.http.put<IRegistroCompra>(this.resourceUrl, registroCompra, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRegistroCompra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegistroCompra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegistroCompra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
