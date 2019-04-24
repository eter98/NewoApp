import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';
import { EntradaMiembrosService } from './entrada-miembros.service';

@Component({
    selector: 'jhi-entrada-miembros-delete-dialog',
    templateUrl: './entrada-miembros-delete-dialog.component.html'
})
export class EntradaMiembrosDeleteDialogComponent {
    entradaMiembros: IEntradaMiembros;

    constructor(
        protected entradaMiembrosService: EntradaMiembrosService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entradaMiembrosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'entradaMiembrosListModification',
                content: 'Deleted an entradaMiembros'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entrada-miembros-delete-popup',
    template: ''
})
export class EntradaMiembrosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entradaMiembros }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntradaMiembrosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.entradaMiembros = entradaMiembros;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/entrada-miembros', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/entrada-miembros', { outlets: { popup: null } }]);
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
