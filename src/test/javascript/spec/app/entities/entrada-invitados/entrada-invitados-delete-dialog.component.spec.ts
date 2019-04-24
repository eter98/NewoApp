/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaInvitadosDeleteDialogComponent } from 'app/entities/entrada-invitados/entrada-invitados-delete-dialog.component';
import { EntradaInvitadosService } from 'app/entities/entrada-invitados/entrada-invitados.service';

describe('Component Tests', () => {
    describe('EntradaInvitados Management Delete Component', () => {
        let comp: EntradaInvitadosDeleteDialogComponent;
        let fixture: ComponentFixture<EntradaInvitadosDeleteDialogComponent>;
        let service: EntradaInvitadosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaInvitadosDeleteDialogComponent]
            })
                .overrideTemplate(EntradaInvitadosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntradaInvitadosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntradaInvitadosService);
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
