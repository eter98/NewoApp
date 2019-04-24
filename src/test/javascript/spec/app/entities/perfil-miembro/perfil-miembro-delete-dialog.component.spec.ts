/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilMiembroDeleteDialogComponent } from 'app/entities/perfil-miembro/perfil-miembro-delete-dialog.component';
import { PerfilMiembroService } from 'app/entities/perfil-miembro/perfil-miembro.service';

describe('Component Tests', () => {
    describe('PerfilMiembro Management Delete Component', () => {
        let comp: PerfilMiembroDeleteDialogComponent;
        let fixture: ComponentFixture<PerfilMiembroDeleteDialogComponent>;
        let service: PerfilMiembroService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilMiembroDeleteDialogComponent]
            })
                .overrideTemplate(PerfilMiembroDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilMiembroDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilMiembroService);
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
