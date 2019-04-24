/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { EquipoEmpresasComponent } from 'app/entities/equipo-empresas/equipo-empresas.component';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas/equipo-empresas.service';
import { EquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

describe('Component Tests', () => {
    describe('EquipoEmpresas Management Component', () => {
        let comp: EquipoEmpresasComponent;
        let fixture: ComponentFixture<EquipoEmpresasComponent>;
        let service: EquipoEmpresasService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EquipoEmpresasComponent],
                providers: []
            })
                .overrideTemplate(EquipoEmpresasComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EquipoEmpresasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipoEmpresasService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EquipoEmpresas(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.equipoEmpresas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
