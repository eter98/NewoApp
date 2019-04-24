import { IMiembros } from 'app/shared/model/miembros.model';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';
import { ILanding } from 'app/shared/model/landing.model';

export interface IEquipoEmpresas {
    id?: number;
    nombre?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
    descripcion?: any;
    logosContentType?: string;
    logos?: any;
    paginaWeb?: string;
    miembros?: IMiembros;
    facturacion?: IFacturacion;
    perfilEquipoEmpresa?: IPerfilEquipoEmpresa;
    landings?: ILanding[];
}

export class EquipoEmpresas implements IEquipoEmpresas {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefono?: string,
        public correo?: string,
        public direccion?: string,
        public descripcion?: any,
        public logosContentType?: string,
        public logos?: any,
        public paginaWeb?: string,
        public miembros?: IMiembros,
        public facturacion?: IFacturacion,
        public perfilEquipoEmpresa?: IPerfilEquipoEmpresa,
        public landings?: ILanding[]
    ) {}
}
