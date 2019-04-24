import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';
import { EspaciosReservaService } from './espacios-reserva.service';

@Component({
    selector: 'jhi-espacios-reserva-delete-dialog',
    templateUrl: './espacios-reserva-delete-dialog.component.html'
})
export class EspaciosReservaDeleteDialogComponent {
    espaciosReserva: IEspaciosReserva;

    constructor(
        protected espaciosReservaService: EspaciosReservaService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.espaciosReservaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'espaciosReservaListModification',
                content: 'Deleted an espaciosReserva'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-espacios-reserva-delete-popup',
    template: ''
})
export class EspaciosReservaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espaciosReserva }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EspaciosReservaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.espaciosReserva = espaciosReserva;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/espacios-reserva', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/espacios-reserva', { outlets: { popup: null } }]);
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
