/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilEquipoEmpresaUpdateComponent } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa-update.component';
import { PerfilEquipoEmpresaService } from 'app/entities/perfil-equipo-empresa/perfil-equipo-empresa.service';
import { PerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

describe('Component Tests', () => {
    describe('PerfilEquipoEmpresa Management Update Component', () => {
        let comp: PerfilEquipoEmpresaUpdateComponent;
        let fixture: ComponentFixture<PerfilEquipoEmpresaUpdateComponent>;
        let service: PerfilEquipoEmpresaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilEquipoEmpresaUpdateComponent]
            })
                .overrideTemplate(PerfilEquipoEmpresaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerfilEquipoEmpresaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilEquipoEmpresaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerfilEquipoEmpresa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perfilEquipoEmpresa = entity;
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
                    const entity = new PerfilEquipoEmpresa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perfilEquipoEmpresa = entity;
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
