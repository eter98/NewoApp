/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { EntradaMiembrosComponent } from 'app/entities/entrada-miembros/entrada-miembros.component';
import { EntradaMiembrosService } from 'app/entities/entrada-miembros/entrada-miembros.service';
import { EntradaMiembros } from 'app/shared/model/entrada-miembros.model';

describe('Component Tests', () => {
    describe('EntradaMiembros Management Component', () => {
        let comp: EntradaMiembrosComponent;
        let fixture: ComponentFixture<EntradaMiembrosComponent>;
        let service: EntradaMiembrosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EntradaMiembrosComponent],
                providers: []
            })
                .overrideTemplate(EntradaMiembrosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntradaMiembrosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntradaMiembrosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EntradaMiembros(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entradaMiembros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
