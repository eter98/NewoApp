/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { EspacioLibreComponent } from 'app/entities/espacio-libre/espacio-libre.component';
import { EspacioLibreService } from 'app/entities/espacio-libre/espacio-libre.service';
import { EspacioLibre } from 'app/shared/model/espacio-libre.model';

describe('Component Tests', () => {
    describe('EspacioLibre Management Component', () => {
        let comp: EspacioLibreComponent;
        let fixture: ComponentFixture<EspacioLibreComponent>;
        let service: EspacioLibreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [EspacioLibreComponent],
                providers: []
            })
                .overrideTemplate(EspacioLibreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspacioLibreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspacioLibreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EspacioLibre(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.espacioLibres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
