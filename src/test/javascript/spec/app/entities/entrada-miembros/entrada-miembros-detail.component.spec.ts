/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaMiembrosDetailComponent } from 'app/entities/entrada-miembros/entrada-miembros-detail.component';
import { EntradaMiembros } from 'app/shared/model/entrada-miembros.model';

describe('Component Tests', () => {
    describe('EntradaMiembros Management Detail Component', () => {
        let comp: EntradaMiembrosDetailComponent;
        let fixture: ComponentFixture<EntradaMiembrosDetailComponent>;
        const route = ({ data: of({ entradaMiembros: new EntradaMiembros(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaMiembrosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EntradaMiembrosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EntradaMiembrosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.entradaMiembros).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
