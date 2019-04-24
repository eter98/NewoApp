import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';

type EntityResponseType = HttpResponse<IEspaciosReserva>;
type EntityArrayResponseType = HttpResponse<IEspaciosReserva[]>;

@Injectable({ providedIn: 'root' })
export class EspaciosReservaService {
    public resourceUrl = SERVER_API_URL + 'api/espacios-reservas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/espacios-reservas';

    constructor(protected http: HttpClient) {}

    create(espaciosReserva: IEspaciosReserva): Observable<EntityResponseType> {
        return this.http.post<IEspaciosReserva>(this.resourceUrl, espaciosReserva, { observe: 'response' });
    }

    update(espaciosReserva: IEspaciosReserva): Observable<EntityResponseType> {
        return this.http.put<IEspaciosReserva>(this.resourceUrl, espaciosReserva, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEspaciosReserva>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspaciosReserva[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspaciosReserva[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
