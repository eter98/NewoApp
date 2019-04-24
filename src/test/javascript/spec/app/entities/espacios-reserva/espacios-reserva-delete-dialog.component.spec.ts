/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { EspaciosReservaDeleteDialogComponent } from 'app/entities/espacios-reserva/espacios-reserva-delete-dialog.component';
import { EspaciosReservaService } from 'app/entities/espacios-reserva/espacios-reserva.service';

describe('Component Tests', () => {
    describe('EspaciosReserva Management Delete Component', () => {
        let comp: EspaciosReservaDeleteDialogComponent;
        let fixture: ComponentFixture<EspaciosReservaDeleteDialogComponent>;
        let service: EspaciosReservaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspaciosReservaDeleteDialogComponent]
            })
                .overrideTemplate(EspaciosReservaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspaciosReservaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspaciosReservaService);
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
