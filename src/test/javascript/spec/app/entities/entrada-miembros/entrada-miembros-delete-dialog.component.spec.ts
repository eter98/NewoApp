/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaMiembrosDeleteDialogComponent } from 'app/entities/entrada-miembros/entrada-miembros-delete-dialog.component';
import { EntradaMiembrosService } from 'app/entities/entrada-miembros/entrada-miembros.service';

describe('Component Tests', () => {
    describe('EntradaMiembros Management Delete Component', () => {
        let comp: EntradaMiembrosDeleteDialogComponent;
        let fixture: ComponentFixture<EntradaMiembrosDeleteDialogComponent>;
        let service: EntradaMiembrosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaMiembrosDeleteDialogComponent]
            })
                .overrideTemplate(EntradaMiembrosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntradaMiembrosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntradaMiembrosService);
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
