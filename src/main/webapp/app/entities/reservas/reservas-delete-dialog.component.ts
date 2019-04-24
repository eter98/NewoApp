import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReservas } from 'app/shared/model/reservas.model';
import { ReservasService } from './reservas.service';

@Component({
    selector: 'jhi-reservas-delete-dialog',
    templateUrl: './reservas-delete-dialog.component.html'
})
export class ReservasDeleteDialogComponent {
    reservas: IReservas;

    constructor(protected reservasService: ReservasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reservasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reservasListModification',
                content: 'Deleted an reservas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reservas-delete-popup',
    template: ''
})
export class ReservasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reservas }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReservasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.reservas = reservas;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/reservas', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/reservas', { outlets: { popup: null } }]);
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
