import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';
import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from 'app/entities/miembros';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from 'app/entities/espacio-libre';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { EntradaInvitadosService } from 'app/entities/entrada-invitados';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from 'app/entities/facturacion';
import { IReservas } from 'app/shared/model/reservas.model';
import { ReservasService } from 'app/entities/reservas';

@Component({
    selector: 'jhi-registro-compra-update',
    templateUrl: './registro-compra-update.component.html'
})
export class RegistroCompraUpdateComponent implements OnInit {
    registroCompra: IRegistroCompra;
    isSaving: boolean;

    miembros: IMiembros[];

    espaciolibres: IEspacioLibre[];

    entradainvitados: IEntradaInvitados[];

    facturacions: IFacturacion[];

    reservas: IReservas[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected registroCompraService: RegistroCompraService,
        protected miembrosService: MiembrosService,
        protected espacioLibreService: EspacioLibreService,
        protected entradaInvitadosService: EntradaInvitadosService,
        protected facturacionService: FacturacionService,
        protected reservasService: ReservasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ registroCompra }) => {
            this.registroCompra = registroCompra;
        });
        this.miembrosService
            .query({ filter: 'registrocompra-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMiembros[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMiembros[]>) => response.body)
            )
            .subscribe(
                (res: IMiembros[]) => {
                    if (!this.registroCompra.miembros || !this.registroCompra.miembros.id) {
                        this.miembros = res;
                    } else {
                        this.miembrosService
                            .find(this.registroCompra.miembros.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMiembros>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMiembros>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMiembros) => (this.miembros = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.espacioLibreService
            .query({ filter: 'registrocompra-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspacioLibre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspacioLibre[]>) => response.body)
            )
            .subscribe(
                (res: IEspacioLibre[]) => {
                    if (!this.registroCompra.espacioLibre || !this.registroCompra.espacioLibre.id) {
                        this.espaciolibres = res;
                    } else {
                        this.espacioLibreService
                            .find(this.registroCompra.espacioLibre.id)
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
        this.entradaInvitadosService
            .query({ filter: 'registrocompra-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEntradaInvitados[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEntradaInvitados[]>) => response.body)
            )
            .subscribe(
                (res: IEntradaInvitados[]) => {
                    if (!this.registroCompra.entradaInvitados || !this.registroCompra.entradaInvitados.id) {
                        this.entradainvitados = res;
                    } else {
                        this.entradaInvitadosService
                            .find(this.registroCompra.entradaInvitados.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEntradaInvitados>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEntradaInvitados>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEntradaInvitados) => (this.entradainvitados = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.facturacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFacturacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFacturacion[]>) => response.body)
            )
            .subscribe((res: IFacturacion[]) => (this.facturacions = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.registroCompra.id !== undefined) {
            this.subscribeToSaveResponse(this.registroCompraService.update(this.registroCompra));
        } else {
            this.subscribeToSaveResponse(this.registroCompraService.create(this.registroCompra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegistroCompra>>) {
        result.subscribe((res: HttpResponse<IRegistroCompra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMiembrosById(index: number, item: IMiembros) {
        return item.id;
    }

    trackEspacioLibreById(index: number, item: IEspacioLibre) {
        return item.id;
    }

    trackEntradaInvitadosById(index: number, item: IEntradaInvitados) {
        return item.id;
    }

    trackFacturacionById(index: number, item: IFacturacion) {
        return item.id;
    }

    trackReservasById(index: number, item: IReservas) {
        return item.id;
    }
}
