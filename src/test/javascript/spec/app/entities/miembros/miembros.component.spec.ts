/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { MiembrosComponent } from 'app/entities/miembros/miembros.component';
import { MiembrosService } from 'app/entities/miembros/miembros.service';
import { Miembros } from 'app/shared/model/miembros.model';

describe('Component Tests', () => {
    describe('Miembros Management Component', () => {
        let comp: MiembrosComponent;
        let fixture: ComponentFixture<MiembrosComponent>;
        let service: MiembrosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [MiembrosComponent],
                providers: []
            })
                .overrideTemplate(MiembrosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MiembrosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MiembrosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Miembros(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.miembros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
