import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'miembros',
                loadChildren: './miembros/miembros.module#NewoAppMiembrosModule'
            },
            {
                path: 'perfil-miembro',
                loadChildren: './perfil-miembro/perfil-miembro.module#NewoAppPerfilMiembroModule'
            },
            {
                path: 'entrada-miembros',
                loadChildren: './entrada-miembros/entrada-miembros.module#NewoAppEntradaMiembrosModule'
            },
            {
                path: 'invitados',
                loadChildren: './invitados/invitados.module#NewoAppInvitadosModule'
            },
            {
                path: 'entrada-invitados',
                loadChildren: './entrada-invitados/entrada-invitados.module#NewoAppEntradaInvitadosModule'
            },
            {
                path: 'sedes',
                loadChildren: './sedes/sedes.module#NewoAppSedesModule'
            },
            {
                path: 'espacio-libre',
                loadChildren: './espacio-libre/espacio-libre.module#NewoAppEspacioLibreModule'
            },
            {
                path: 'host-sede',
                loadChildren: './host-sede/host-sede.module#NewoAppHostSedeModule'
            },
            {
                path: 'reservas',
                loadChildren: './reservas/reservas.module#NewoAppReservasModule'
            },
            {
                path: 'espacios-reserva',
                loadChildren: './espacios-reserva/espacios-reserva.module#NewoAppEspaciosReservaModule'
            },
            {
                path: 'registro-compra',
                loadChildren: './registro-compra/registro-compra.module#NewoAppRegistroCompraModule'
            },
            {
                path: 'facturacion',
                loadChildren: './facturacion/facturacion.module#NewoAppFacturacionModule'
            },
            {
                path: 'equipo-empresas',
                loadChildren: './equipo-empresas/equipo-empresas.module#NewoAppEquipoEmpresasModule'
            },
            {
                path: 'cuenta-asociada',
                loadChildren: './cuenta-asociada/cuenta-asociada.module#NewoAppCuentaAsociadaModule'
            },
            {
                path: 'beneficio',
                loadChildren: './beneficio/beneficio.module#NewoAppBeneficioModule'
            },
            {
                path: 'perfil-equipo-empresa',
                loadChildren: './perfil-equipo-empresa/perfil-equipo-empresa.module#NewoAppPerfilEquipoEmpresaModule'
            },
            {
                path: 'empresa',
                loadChildren: './empresa/empresa.module#NewoAppEmpresaModule'
            },
            {
                path: 'landing',
                loadChildren: './landing/landing.module#NewoAppLandingModule'
            },
            {
                path: 'tarifa-landing',
                loadChildren: './tarifa-landing/tarifa-landing.module#NewoAppTarifaLandingModule'
            },
            {
                path: 'productos-servicios',
                loadChildren: './productos-servicios/productos-servicios.module#NewoAppProductosServiciosModule'
            },
            {
                path: 'pais',
                loadChildren: './pais/pais.module#NewoAppPaisModule'
            },
            {
                path: 'ciudad',
                loadChildren: './ciudad/ciudad.module#NewoAppCiudadModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewoAppEntityModule {}
