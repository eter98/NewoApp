/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NewoAppTestModule } from '../../../test.module';
import { HostSedeComponent } from 'app/entities/host-sede/host-sede.component';
import { HostSedeService } from 'app/entities/host-sede/host-sede.service';
import { HostSede } from 'app/shared/model/host-sede.model';

describe('Component Tests', () => {
    describe('HostSede Management Component', () => {
        let comp: HostSedeComponent;
        let fixture: ComponentFixture<HostSedeComponent>;
        let service: HostSedeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [HostSedeComponent],
                providers: []
            })
                .overrideTemplate(HostSedeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HostSedeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HostSedeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HostSede(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hostSedes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
