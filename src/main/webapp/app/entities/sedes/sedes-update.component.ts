import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISedes } from 'app/shared/model/sedes.model';
import { SedesService } from './sedes.service';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from 'app/entities/espacio-libre';
import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { EspaciosReservaService } from 'app/entities/espacios-reserva';
import { ILanding } from 'app/shared/model/landing.model';
import { LandingService } from 'app/entities/landing';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { CiudadService } from 'app/entities/ciudad';
import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';
import { EntradaMiembrosService } from 'app/entities/entrada-miembros';

@Component({
    selector: 'jhi-sedes-update',
    templateUrl: './sedes-update.component.html'
})
export class SedesUpdateComponent implements OnInit {
    sedes: ISedes;
    isSaving: boolean;

    espaciolibres: IEspacioLibre[];

    espaciosreservas: IEspaciosReserva[];

    landings: ILanding[];

    ciudads: ICiudad[];

    entradamiembros: IEntradaMiembros[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected sedesService: SedesService,
        protected espacioLibreService: EspacioLibreService,
        protected espaciosReservaService: EspaciosReservaService,
        protected landingService: LandingService,
        protected ciudadService: CiudadService,
        protected entradaMiembrosService: EntradaMiembrosService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sedes }) => {
            this.sedes = sedes;
        });
        this.espacioLibreService
            .query({ filter: 'sedes-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspacioLibre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspacioLibre[]>) => response.body)
            )
            .subscribe(
                (res: IEspacioLibre[]) => {
                    if (!this.sedes.espacioLibre || !this.sedes.espacioLibre.id) {
                        this.espaciolibres = res;
                    } else {
                        this.espacioLibreService
                            .find(this.sedes.espacioLibre.id)
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
        this.espaciosReservaService
            .query({ filter: 'sedes-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspaciosReserva[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspaciosReserva[]>) => response.body)
            )
            .subscribe(
                (res: IEspaciosReserva[]) => {
                    if (!this.sedes.espaciosReserva || !this.sedes.espaciosReserva.id) {
                        this.espaciosreservas = res;
                    } else {
                        this.espaciosReservaService
                            .find(this.sedes.espaciosReserva.id)
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
        this.landingService
            .query({ filter: 'sedes-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILanding[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILanding[]>) => response.body)
            )
            .subscribe(
                (res: ILanding[]) => {
                    if (!this.sedes.landing || !this.sedes.landing.id) {
                        this.landings = res;
                    } else {
                        this.landingService
                            .find(this.sedes.landing.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILanding>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILanding>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILanding) => (this.landings = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.ciudadService
            .query({ filter: 'sedes-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICiudad[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICiudad[]>) => response.body)
            )
            .subscribe(
                (res: ICiudad[]) => {
                    if (!this.sedes.ciudad || !this.sedes.ciudad.id) {
                        this.ciudads = res;
                    } else {
                        this.ciudadService
                            .find(this.sedes.ciudad.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICiudad>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICiudad>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICiudad) => (this.ciudads = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.entradaMiembrosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEntradaMiembros[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEntradaMiembros[]>) => response.body)
            )
            .subscribe((res: IEntradaMiembros[]) => (this.entradamiembros = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.sedes, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sedes.id !== undefined) {
            this.subscribeToSaveResponse(this.sedesService.update(this.sedes));
        } else {
            this.subscribeToSaveResponse(this.sedesService.create(this.sedes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISedes>>) {
        result.subscribe((res: HttpResponse<ISedes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEspaciosReservaById(index: number, item: IEspaciosReserva) {
        return item.id;
    }

    trackLandingById(index: number, item: ILanding) {
        return item.id;
    }

    trackCiudadById(index: number, item: ICiudad) {
        return item.id;
    }

    trackEntradaMiembrosById(index: number, item: IEntradaMiembros) {
        return item.id;
    }
}
