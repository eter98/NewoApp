/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaInvitadosComponent } from 'app/entities/entrada-invitados/entrada-invitados.component';
import { EntradaInvitadosService } from 'app/entities/entrada-invitados/entrada-invitados.service';
import { EntradaInvitados } from 'app/shared/model/entrada-invitados.model';

describe('Component Tests', () => {
    describe('EntradaInvitados Management Component', () => {
        let comp: EntradaInvitadosComponent;
        let fixture: ComponentFixture<EntradaInvitadosComponent>;
        let service: EntradaInvitadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaInvitadosComponent],
                providers: []
            })
                .overrideTemplate(EntradaInvitadosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntradaInvitadosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntradaInvitadosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntradaInvitados(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entradaInvitados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
