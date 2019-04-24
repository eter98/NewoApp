import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHostSede } from 'app/shared/model/host-sede.model';
import { HostSedeService } from './host-sede.service';

@Component({
    selector: 'jhi-host-sede-delete-dialog',
    templateUrl: './host-sede-delete-dialog.component.html'
})
export class HostSedeDeleteDialogComponent {
    hostSede: IHostSede;

    constructor(protected hostSedeService: HostSedeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hostSedeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hostSedeListModification',
                content: 'Deleted an hostSede'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-host-sede-delete-popup',
    template: ''
})
export class HostSedeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hostSede }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HostSedeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.hostSede = hostSede;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/host-sede', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/host-sede', { outlets: { popup: null } }]);
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
