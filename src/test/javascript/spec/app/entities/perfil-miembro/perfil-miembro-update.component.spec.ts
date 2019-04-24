/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { PerfilMiembroUpdateComponent } from 'app/entities/perfil-miembro/perfil-miembro-update.component';
import { PerfilMiembroService } from 'app/entities/perfil-miembro/perfil-miembro.service';
import { PerfilMiembro } from 'app/shared/model/perfil-miembro.model';

describe('Component Tests', () => {
    describe('PerfilMiembro Management Update Component', () => {
        let comp: PerfilMiembroUpdateComponent;
        let fixture: ComponentFixture<PerfilMiembroUpdateComponent>;
        let service: PerfilMiembroService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [PerfilMiembroUpdateComponent]
            })
                .overrideTemplate(PerfilMiembroUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerfilMiembroUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerfilMiembroService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerfilMiembro(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perfilMiembro = entity;
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
                    const entity = new PerfilMiembro();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perfilMiembro = entity;
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
