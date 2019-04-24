import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductosServicios } from 'app/shared/model/productos-servicios.model';

type EntityResponseType = HttpResponse<IProductosServicios>;
type EntityArrayResponseType = HttpResponse<IProductosServicios[]>;

@Injectable({ providedIn: 'root' })
export class ProductosServiciosService {
    public resourceUrl = SERVER_API_URL + 'api/productos-servicios';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/productos-servicios';

    constructor(protected http: HttpClient) {}

    create(productosServicios: IProductosServicios): Observable<EntityResponseType> {
        return this.http.post<IProductosServicios>(this.resourceUrl, productosServicios, { observe: 'response' });
    }

    update(productosServicios: IProductosServicios): Observable<EntityResponseType> {
        return this.http.put<IProductosServicios>(this.resourceUrl, productosServicios, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductosServicios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductosServicios[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductosServicios[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
