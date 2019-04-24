/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaInvitadosDetailComponent } from 'app/entities/entrada-invitados/entrada-invitados-detail.component';
import { EntradaInvitados } from 'app/shared/model/entrada-invitados.model';

describe('Component Tests', () => {
    describe('EntradaInvitados Management Detail Component', () => {
        let comp: EntradaInvitadosDetailComponent;
        let fixture: ComponentFixture<EntradaInvitadosDetailComponent>;
        const route = ({ data: of({ entradaInvitados: new EntradaInvitados(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaInvitadosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntradaInvitadosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntradaInvitadosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entradaInvitados).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
