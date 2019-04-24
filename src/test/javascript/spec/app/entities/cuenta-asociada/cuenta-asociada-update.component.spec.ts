/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { CuentaAsociadaUpdateComponent } from 'app/entities/cuenta-asociada/cuenta-asociada-update.component';
import { CuentaAsociadaService } from 'app/entities/cuenta-asociada/cuenta-asociada.service';
import { CuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

describe('Component Tests', () => {
    describe('CuentaAsociada Management Update Component', () => {
        let comp: CuentaAsociadaUpdateComponent;
        let fixture: ComponentFixture<CuentaAsociadaUpdateComponent>;
        let service: CuentaAsociadaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [CuentaAsociadaUpdateComponent]
            })
                .overrideTemplate(CuentaAsociadaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CuentaAsociadaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuentaAsociadaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CuentaAsociada(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cuentaAsociada = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CuentaAsociada();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cuentaAsociada = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
