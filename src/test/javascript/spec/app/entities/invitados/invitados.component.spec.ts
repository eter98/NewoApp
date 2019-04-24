/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { InvitadosComponent } from 'app/entities/invitados/invitados.component';
import { InvitadosService } from 'app/entities/invitados/invitados.service';
import { Invitados } from 'app/shared/model/invitados.model';

describe('Component Tests', () => {
    describe('Invitados Management Component', () => {
        let comp: InvitadosComponent;
        let fixture: ComponentFixture<InvitadosComponent>;
        let service: InvitadosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [InvitadosComponent],
                providers: []
            })
                .overrideTemplate(InvitadosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvitadosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvitadosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Invitados(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.invitados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
