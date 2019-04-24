/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { EspacioLibreDeleteDialogComponent } from 'app/entities/espacio-libre/espacio-libre-delete-dialog.component';
import { EspacioLibreService } from 'app/entities/espacio-libre/espacio-libre.service';

describe('Component Tests', () => {
    describe('EspacioLibre Management Delete Component', () => {
        let comp: EspacioLibreDeleteDialogComponent;
        let fixture: ComponentFixture<EspacioLibreDeleteDialogComponent>;
        let service: EspacioLibreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspacioLibreDeleteDialogComponent]
            })
                .overrideTemplate(EspacioLibreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspacioLibreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspacioLibreService);
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
