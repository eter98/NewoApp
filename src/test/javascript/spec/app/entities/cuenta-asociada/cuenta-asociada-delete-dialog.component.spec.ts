/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { CuentaAsociadaDeleteDialogComponent } from 'app/entities/cuenta-asociada/cuenta-asociada-delete-dialog.component';
import { CuentaAsociadaService } from 'app/entities/cuenta-asociada/cuenta-asociada.service';

describe('Component Tests', () => {
    describe('CuentaAsociada Management Delete Component', () => {
        let comp: CuentaAsociadaDeleteDialogComponent;
        let fixture: ComponentFixture<CuentaAsociadaDeleteDialogComponent>;
        let service: CuentaAsociadaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CuentaAsociadaDeleteDialogComponent]
            })
                .overrideTemplate(CuentaAsociadaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CuentaAsociadaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuentaAsociadaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
