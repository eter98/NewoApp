import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductosServicios } from 'app/shared/model/productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';

@Component({
    selector: 'jhi-productos-servicios-delete-dialog',
    templateUrl: './productos-servicios-delete-dialog.component.html'
})
export class ProductosServiciosDeleteDialogComponent {
    productosServicios: IProductosServicios;

    constructor(
        protected productosServiciosService: ProductosServiciosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productosServiciosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productosServiciosListModification',
                content: 'Deleted an productosServicios'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-productos-servicios-delete-popup',
    template: ''
})
export class ProductosServiciosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosServicios }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductosServiciosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productosServicios = productosServicios;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/productos-servicios', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/productos-servicios', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
