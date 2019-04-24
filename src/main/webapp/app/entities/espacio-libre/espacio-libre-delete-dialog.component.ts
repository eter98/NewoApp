import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';

@Component({
    selector: 'jhi-espacio-libre-delete-dialog',
    templateUrl: './espacio-libre-delete-dialog.component.html'
})
export class EspacioLibreDeleteDialogComponent {
    espacioLibre: IEspacioLibre;

    constructor(
        protected espacioLibreService: EspacioLibreService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.espacioLibreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'espacioLibreListModification',
                content: 'Deleted an espacioLibre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-espacio-libre-delete-popup',
    template: ''
})
export class EspacioLibreDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espacioLibre }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EspacioLibreDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.espacioLibre = espacioLibre;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/espacio-libre', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/espacio-libre', { outlets: { popup: null } }]);
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
