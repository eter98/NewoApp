/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { CiudadDeleteDialogComponent } from 'app/entities/ciudad/ciudad-delete-dialog.component';
import { CiudadService } from 'app/entities/ciudad/ciudad.service';

describe('Component Tests', () => {
    describe('Ciudad Management Delete Component', () => {
        let comp: CiudadDeleteDialogComponent;
        let fixture: ComponentFixture<CiudadDeleteDialogComponent>;
        let service: CiudadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CiudadDeleteDialogComponent]
            })
                .overrideTemplate(CiudadDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CiudadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CiudadService);
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
