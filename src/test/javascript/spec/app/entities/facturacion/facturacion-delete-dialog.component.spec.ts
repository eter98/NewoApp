/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { FacturacionDeleteDialogComponent } from 'app/entities/facturacion/facturacion-delete-dialog.component';
import { FacturacionService } from 'app/entities/facturacion/facturacion.service';

describe('Component Tests', () => {
    describe('Facturacion Management Delete Component', () => {
        let comp: FacturacionDeleteDialogComponent;
        let fixture: ComponentFixture<FacturacionDeleteDialogComponent>;
        let service: FacturacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [FacturacionDeleteDialogComponent]
            })
                .overrideTemplate(FacturacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FacturacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacturacionService);
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
