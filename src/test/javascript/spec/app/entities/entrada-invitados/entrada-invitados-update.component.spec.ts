/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaInvitadosUpdateComponent } from 'app/entities/entrada-invitados/entrada-invitados-update.component';
import { EntradaInvitadosService } from 'app/entities/entrada-invitados/entrada-invitados.service';
import { EntradaInvitados } from 'app/shared/model/entrada-invitados.model';

describe('Component Tests', () => {
    describe('EntradaInvitados Management Update Component', () => {
        let comp: EntradaInvitadosUpdateComponent;
        let fixture: ComponentFixture<EntradaInvitadosUpdateComponent>;
        let service: EntradaInvitadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaInvitadosUpdateComponent]
            })
                .overrideTemplate(EntradaInvitadosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntradaInvitadosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntradaInvitadosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EntradaInvitados(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entradaInvitados = entity;
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
                    const entity = new EntradaInvitados();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.entradaInvitados = entity;
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
