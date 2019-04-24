/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { EquipoEmpresasDeleteDialogComponent } from 'app/entities/equipo-empresas/equipo-empresas-delete-dialog.component';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas/equipo-empresas.service';

describe('Component Tests', () => {
    describe('EquipoEmpresas Management Delete Component', () => {
        let comp: EquipoEmpresasDeleteDialogComponent;
        let fixture: ComponentFixture<EquipoEmpresasDeleteDialogComponent>;
        let service: EquipoEmpresasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EquipoEmpresasDeleteDialogComponent]
            })
                .overrideTemplate(EquipoEmpresasDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquipoEmpresasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipoEmpresasService);
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
