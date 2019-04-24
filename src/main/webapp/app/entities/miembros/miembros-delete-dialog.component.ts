import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from './miembros.service';

@Component({
    selector: 'jhi-miembros-delete-dialog',
    templateUrl: './miembros-delete-dialog.component.html'
})
export class MiembrosDeleteDialogComponent {
    miembros: IMiembros;

    constructor(protected miembrosService: MiembrosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.miembrosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'miembrosListModification',
                content: 'Deleted an miembros'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-miembros-delete-popup',
    template: ''
})
export class MiembrosDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ miembros }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MiembrosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.miembros = miembros;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/miembros', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/miembros', { outlets: { popup: null } }]);
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
