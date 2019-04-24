/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { EquipoEmpresasDetailComponent } from 'app/entities/equipo-empresas/equipo-empresas-detail.component';
import { EquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

describe('Component Tests', () => {
    describe('EquipoEmpresas Management Detail Component', () => {
        let comp: EquipoEmpresasDetailComponent;
        let fixture: ComponentFixture<EquipoEmpresasDetailComponent>;
        const route = ({ data: of({ equipoEmpresas: new EquipoEmpresas(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EquipoEmpresasDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EquipoEmpresasDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquipoEmpresasDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.equipoEmpresas).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
