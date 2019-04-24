import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

export interface IProductosServicios {
    id?: number;
    nombreProducto?: string;
    fotoContentType?: string;
    foto?: any;
    descripcion?: string;
    inventariables?: number;
    valor?: number;
    impuesto?: number;
    perfilEquipoEmpresa?: IPerfilEquipoEmpresa;
}

export class ProductosServicios implements IProductosServicios {
    constructor(
        public id?: number,
        public nombreProducto?: string,
        public fotoContentType?: string,
        public foto?: any,
        public descripcion?: string,
        public inventariables?: number,
        public valor?: number,
        public impuesto?: number,
        public perfilEquipoEmpresa?: IPerfilEquipoEmpresa
    ) {}
}
