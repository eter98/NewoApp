/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { InvitadosUpdateComponent } from 'app/entities/invitados/invitados-update.component';
import { InvitadosService } from 'app/entities/invitados/invitados.service';
import { Invitados } from 'app/shared/model/invitados.model';

describe('Component Tests', () => {
    describe('Invitados Management Update Component', () => {
        let comp: InvitadosUpdateComponent;
        let fixture: ComponentFixture<InvitadosUpdateComponent>;
        let service: InvitadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [InvitadosUpdateComponent]
            })
                .overrideTemplate(InvitadosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvitadosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvitadosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Invitados(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invitados = entity;
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
                    const entity = new Invitados();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invitados = entity;
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
