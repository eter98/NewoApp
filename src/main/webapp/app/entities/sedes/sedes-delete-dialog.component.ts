import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISedes } from 'app/shared/model/sedes.model';
import { SedesService } from './sedes.service';

@Component({
    selector: 'jhi-sedes-delete-dialog',
    templateUrl: './sedes-delete-dialog.component.html'
})
export class SedesDeleteDialogComponent {
    sedes: ISedes;

    constructor(protected sedesService: SedesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sedesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sedesListModification',
                content: 'Deleted an sedes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sedes-delete-popup',
    template: ''
})
export class SedesDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sedes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SedesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sedes = sedes;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/sedes', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/sedes', { outlets: { popup: null } }]);
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
