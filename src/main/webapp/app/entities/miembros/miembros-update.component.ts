import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from './miembros.service';
import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { PerfilMiembroService } from 'app/entities/perfil-miembro';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from 'app/entities/espacio-libre';
import { IHostSede } from 'app/shared/model/host-sede.model';
import { HostSedeService } from 'app/entities/host-sede';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from 'app/entities/registro-compra';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas';

@Component({
    selector: 'jhi-miembros-update',
    templateUrl: './miembros-update.component.html'
})
export class MiembrosUpdateComponent implements OnInit {
    miembros: IMiembros;
    isSaving: boolean;

    perfilmiembros: IPerfilMiembro[];

    espaciolibres: IEspacioLibre[];

    hostsedes: IHostSede[];

    registrocompras: IRegistroCompra[];

    equipoempresas: IEquipoEmpresas[];
    fevhaNacimientoDp: any;
    fechaRegistroDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected miembrosService: MiembrosService,
        protected perfilMiembroService: PerfilMiembroService,
        protected espacioLibreService: EspacioLibreService,
        protected hostSedeService: HostSedeService,
        protected registroCompraService: RegistroCompraService,
        protected equipoEmpresasService: EquipoEmpresasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ miembros }) => {
            this.miembros = miembros;
        });
        this.perfilMiembroService
            .query({ filter: 'miembros-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPerfilMiembro[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPerfilMiembro[]>) => response.body)
            )
            .subscribe(
                (res: IPerfilMiembro[]) => {
                    if (!this.miembros.perfilMiembro || !this.miembros.perfilMiembro.id) {
                        this.perfilmiembros = res;
                    } else {
                        this.perfilMiembroService
                            .find(this.miembros.perfilMiembro.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPerfilMiembro>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPerfilMiembro>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPerfilMiembro) => (this.perfilmiembros = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.espacioLibreService
            .query({ filter: 'miembros-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEspacioLibre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEspacioLibre[]>) => response.body)
            )
            .subscribe(
                (res: IEspacioLibre[]) => {
                    if (!this.miembros.espacioLibre || !this.miembros.espacioLibre.id) {
                        this.espaciolibres = res;
                    } else {
                        this.espacioLibreService
                            .find(this.miembros.espacioLibre.id)
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
        this.hostSedeService
            .query({ filter: 'miembros-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IHostSede[]>) => mayBeOk.ok),
                map((response: HttpResponse<IHostSede[]>) => response.body)
            )
            .subscribe(
                (res: IHostSede[]) => {
                    if (!this.miembros.hostSede || !this.miembros.hostSede.id) {
                        this.hostsedes = res;
                    } else {
                        this.hostSedeService
                            .find(this.miembros.hostSede.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IHostSede>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IHostSede>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IHostSede) => (this.hostsedes = [subRes].concat(res)),
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
        this.equipoEmpresasService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEquipoEmpresas[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEquipoEmpresas[]>) => response.body)
            )
            .subscribe((res: IEquipoEmpresas[]) => (this.equipoempresas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.miembros.id !== undefined) {
            this.subscribeToSaveResponse(this.miembrosService.update(this.miembros));
        } else {
            this.subscribeToSaveResponse(this.miembrosService.create(this.miembros));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMiembros>>) {
        result.subscribe((res: HttpResponse<IMiembros>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerfilMiembroById(index: number, item: IPerfilMiembro) {
        return item.id;
    }

    trackEspacioLibreById(index: number, item: IEspacioLibre) {
        return item.id;
    }

    trackHostSedeById(index: number, item: IHostSede) {
        return item.id;
    }

    trackRegistroCompraById(index: number, item: IRegistroCompra) {
        return item.id;
    }

    trackEquipoEmpresasById(index: number, item: IEquipoEmpresas) {
        return item.id;
    }
}
