/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { InvitadosDetailComponent } from 'app/entities/invitados/invitados-detail.component';
import { Invitados } from 'app/shared/model/invitados.model';

describe('Component Tests', () => {
    describe('Invitados Management Detail Component', () => {
        let comp: InvitadosDetailComponent;
        let fixture: ComponentFixture<InvitadosDetailComponent>;
        const route = ({ data: of({ invitados: new Invitados(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [InvitadosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InvitadosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvitadosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.invitados).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
