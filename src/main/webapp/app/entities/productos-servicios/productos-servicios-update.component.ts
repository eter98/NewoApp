import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProductosServicios } from 'app/shared/model/productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';
import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';
import { PerfilEquipoEmpresaService } from 'app/entities/perfil-equipo-empresa';

@Component({
    selector: 'jhi-productos-servicios-update',
    templateUrl: './productos-servicios-update.component.html'
})
export class ProductosServiciosUpdateComponent implements OnInit {
    productosServicios: IProductosServicios;
    isSaving: boolean;

    perfilequipoempresas: IPerfilEquipoEmpresa[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productosServiciosService: ProductosServiciosService,
        protected perfilEquipoEmpresaService: PerfilEquipoEmpresaService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productosServicios }) => {
            this.productosServicios = productosServicios;
        });
        this.perfilEquipoEmpresaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPerfilEquipoEmpresa[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPerfilEquipoEmpresa[]>) => response.body)
            )
            .subscribe(
                (res: IPerfilEquipoEmpresa[]) => (this.perfilequipoempresas = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        this.dataUtils.clearInputImage(this.productosServicios, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productosServicios.id !== undefined) {
            this.subscribeToSaveResponse(this.productosServiciosService.update(this.productosServicios));
        } else {
            this.subscribeToSaveResponse(this.productosServiciosService.create(this.productosServicios));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductosServicios>>) {
        result.subscribe((res: HttpResponse<IProductosServicios>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerfilEquipoEmpresaById(index: number, item: IPerfilEquipoEmpresa) {
        return item.id;
    }
}
