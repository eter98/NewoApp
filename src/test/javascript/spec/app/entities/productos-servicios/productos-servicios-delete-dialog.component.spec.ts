/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NewoAppTestModule } from '../../../test.module';
import { ProductosServiciosDeleteDialogComponent } from 'app/entities/productos-servicios/productos-servicios-delete-dialog.component';
import { ProductosServiciosService } from 'app/entities/productos-servicios/productos-servicios.service';

describe('Component Tests', () => {
    describe('ProductosServicios Management Delete Component', () => {
        let comp: ProductosServiciosDeleteDialogComponent;
        let fixture: ComponentFixture<ProductosServiciosDeleteDialogComponent>;
        let service: ProductosServiciosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ProductosServiciosDeleteDialogComponent]
            })
                .overrideTemplate(ProductosServiciosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosServiciosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductosServiciosService);
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
