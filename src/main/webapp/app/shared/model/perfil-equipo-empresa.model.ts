import { IProductosServicios } from 'app/shared/model/productos-servicios.model';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

export interface IPerfilEquipoEmpresa {
    id?: number;
    nombre?: string;
    descripcion?: string;
    inventariable?: number;
    valor?: number;
    impuesto?: number;
    productosServicios?: IProductosServicios[];
    equipoEmpresas?: IEquipoEmpresas;
}

export class PerfilEquipoEmpresa implements IPerfilEquipoEmpresa {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public inventariable?: number,
        public valor?: number,
        public impuesto?: number,
        public productosServicios?: IProductosServicios[],
        public equipoEmpresas?: IEquipoEmpresas
    ) {}
}
