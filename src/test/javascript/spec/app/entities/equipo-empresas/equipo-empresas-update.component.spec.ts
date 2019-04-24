/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EquipoEmpresasUpdateComponent } from 'app/entities/equipo-empresas/equipo-empresas-update.component';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas/equipo-empresas.service';
import { EquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

describe('Component Tests', () => {
    describe('EquipoEmpresas Management Update Component', () => {
        let comp: EquipoEmpresasUpdateComponent;
        let fixture: ComponentFixture<EquipoEmpresasUpdateComponent>;
        let service: EquipoEmpresasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EquipoEmpresasUpdateComponent]
            })
                .overrideTemplate(EquipoEmpresasUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EquipoEmpresasUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipoEmpresasService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EquipoEmpresas(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equipoEmpresas = entity;
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
                    const entity = new EquipoEmpresas();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equipoEmpresas = entity;
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
