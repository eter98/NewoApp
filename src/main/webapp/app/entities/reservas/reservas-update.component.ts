import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IReservas } from 'app/shared/model/reservas.model';
import { ReservasService } from './reservas.service';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { EspaciosReservaService } from 'app/entities/espacios-reserva';
import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from 'app/entities/miembros';

@Component({
    selector: 'jhi-reservas-update',
    templateUrl: './reservas-update.component.html'
})
export class ReservasUpdateComponent implements OnInit {
    reservas: IReservas;
    isSaving: boolean;

    espaciosreservas: IEspaciosReserva[];

    miembros: IMiembros[];
    fechaEntradaDp: any;
    fechaSalidaDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected reservasService: ReservasService,
        protected espaciosReservaService: EspaciosReservaService,
        protected miembrosService: MiembrosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reservas }) => {
            this.reservas = reservas;
        });
        this.espaciosReservaService
            .query({ filter: 'reservas-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspaciosReserva[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspaciosReserva[]>) => response.body)
            )
            .subscribe(
                (res: IEspaciosReserva[]) => {
                    if (!this.reservas.espaciosReserva || !this.reservas.espaciosReserva.id) {
                        this.espaciosreservas = res;
                    } else {
                        this.espaciosReservaService
                            .find(this.reservas.espaciosReserva.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEspaciosReserva>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEspaciosReserva>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEspaciosReserva) => (this.espaciosreservas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.miembrosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMiembros[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMiembros[]>) => response.body)
            )
            .subscribe((res: IMiembros[]) => (this.miembros = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reservas.id !== undefined) {
            this.subscribeToSaveResponse(this.reservasService.update(this.reservas));
        } else {
            this.subscribeToSaveResponse(this.reservasService.create(this.reservas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservas>>) {
        result.subscribe((res: HttpResponse<IReservas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEspaciosReservaById(index: number, item: IEspaciosReserva) {
        return item.id;
    }

    trackMiembrosById(index: number, item: IMiembros) {
        return item.id;
    }
}
