import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from 'app/entities/espacio-libre';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from 'app/entities/registro-compra';
import { IInvitados } from 'app/shared/model/invitados.model';
import { InvitadosService } from 'app/entities/invitados';
import { IReservas } from 'app/shared/model/reservas.model';
import { ReservasService } from 'app/entities/reservas';

@Component({
    selector: 'jhi-entrada-invitados-update',
    templateUrl: './entrada-invitados-update.component.html'
})
export class EntradaInvitadosUpdateComponent implements OnInit {
    entradaInvitados: IEntradaInvitados;
    isSaving: boolean;

    espaciolibres: IEspacioLibre[];

    registrocompras: IRegistroCompra[];

    invitados: IInvitados[];

    reservas: IReservas[];
    fechaEntradaDp: any;
    fechaSalidaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected entradaInvitadosService: EntradaInvitadosService,
        protected espacioLibreService: EspacioLibreService,
        protected registroCompraService: RegistroCompraService,
        protected invitadosService: InvitadosService,
        protected reservasService: ReservasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entradaInvitados }) => {
            this.entradaInvitados = entradaInvitados;
        });
        this.espacioLibreService
            .query({ filter: 'entradainvitados-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspacioLibre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspacioLibre[]>) => response.body)
            )
            .subscribe(
                (res: IEspacioLibre[]) => {
                    if (!this.entradaInvitados.espacioLibre || !this.entradaInvitados.espacioLibre.id) {
                        this.espaciolibres = res;
                    } else {
                        this.espacioLibreService
                            .find(this.entradaInvitados.espacioLibre.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEspacioLibre>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEspacioLibre>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEspacioLibre) => (this.espaciolibres = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.registroCompraService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRegistroCompra[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRegistroCompra[]>) => response.body)
            )
            .subscribe((res: IRegistroCompra[]) => (this.registrocompras = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.invitadosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IInvitados[]>) => mayBeOk.ok),
                map((response: HttpResponse<IInvitados[]>) => response.body)
            )
            .subscribe((res: IInvitados[]) => (this.invitados = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.reservasService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IReservas[]>) => mayBeOk.ok),
                map((response: HttpResponse<IReservas[]>) => response.body)
            )
            .subscribe((res: IReservas[]) => (this.reservas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.entradaInvitados.id !== undefined) {
            this.subscribeToSaveResponse(this.entradaInvitadosService.update(this.entradaInvitados));
        } else {
            this.subscribeToSaveResponse(this.entradaInvitadosService.create(this.entradaInvitados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntradaInvitados>>) {
        result.subscribe((res: HttpResponse<IEntradaInvitados>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEspacioLibreById(index: number, item: IEspacioLibre) {
        return item.id;
    }

    trackRegistroCompraById(index: number, item: IRegistroCompra) {
        return item.id;
    }

    trackInvitadosById(index: number, item: IInvitados) {
        return item.id;
    }

    trackReservasById(index: number, item: IReservas) {
        return item.id;
    }
}
