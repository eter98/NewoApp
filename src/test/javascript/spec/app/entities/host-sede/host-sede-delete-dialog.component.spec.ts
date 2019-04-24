/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { HostSedeDeleteDialogComponent } from 'app/entities/host-sede/host-sede-delete-dialog.component';
import { HostSedeService } from 'app/entities/host-sede/host-sede.service';

describe('Component Tests', () => {
    describe('HostSede Management Delete Component', () => {
        let comp: HostSedeDeleteDialogComponent;
        let fixture: ComponentFixture<HostSedeDeleteDialogComponent>;
        let service: HostSedeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [HostSedeDeleteDialogComponent]
            })
                .overrideTemplate(HostSedeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HostSedeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HostSedeService);
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
