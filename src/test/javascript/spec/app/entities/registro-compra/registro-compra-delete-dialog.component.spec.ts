/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { RegistroCompraDeleteDialogComponent } from 'app/entities/registro-compra/registro-compra-delete-dialog.component';
import { RegistroCompraService } from 'app/entities/registro-compra/registro-compra.service';

describe('Component Tests', () => {
    describe('RegistroCompra Management Delete Component', () => {
        let comp: RegistroCompraDeleteDialogComponent;
        let fixture: ComponentFixture<RegistroCompraDeleteDialogComponent>;
        let service: RegistroCompraService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [RegistroCompraDeleteDialogComponent]
            })
                .overrideTemplate(RegistroCompraDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegistroCompraDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroCompraService);
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
