/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilEquipoEmpresaDeleteDialogComponent } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa-delete-dialog.component';
import { PerfilEquipoEmpresaService } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa.service';

describe('Component Tests', () => {
    describe('PerfilEquipoEmpresa Management Delete Component', () => {
        let comp: PerfilEquipoEmpresaDeleteDialogComponent;
        let fixture: ComponentFixture<PerfilEquipoEmpresaDeleteDialogComponent>;
        let service: PerfilEquipoEmpresaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilEquipoEmpresaDeleteDialogComponent]
            })
                .overrideTemplate(PerfilEquipoEmpresaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerfilEquipoEmpresaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilEquipoEmpresaService);
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
