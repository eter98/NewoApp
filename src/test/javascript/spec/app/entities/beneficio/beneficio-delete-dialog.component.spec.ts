/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { BeneficioDeleteDialogComponent } from 'app/entities/beneficio/beneficio-delete-dialog.component';
import { BeneficioService } from 'app/entities/beneficio/beneficio.service';

describe('Component Tests', () => {
    describe('Beneficio Management Delete Component', () => {
        let comp: BeneficioDeleteDialogComponent;
        let fixture: ComponentFixture<BeneficioDeleteDialogComponent>;
        let service: BeneficioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [BeneficioDeleteDialogComponent]
            })
                .overrideTemplate(BeneficioDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BeneficioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficioService);
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
