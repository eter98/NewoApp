import { IFacturacion } from 'app/shared/model/facturacion.model';

export interface IEmpresa {
    id?: number;
    razonSocial?: string;
    nit?: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    celular?: string;
    facturacion?: IFacturacion;
}

export class Empresa implements IEmpresa {
    constructor(
        public id?: number,
        public razonSocial?: string,
        public nit?: string,
        public direccion?: string,
        public telefono?: string,
        public correo?: string,
        public celular?: string,
        public facturacion?: IFacturacion
    ) {}
}
