import { IEmpresa } from 'app/shared/model/empresa.model';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';
import { IBeneficio } from 'app/shared/model/beneficio.model';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

export interface IFacturacion {
    id?: number;
    titularFactura?: string;
    tipoPersona?: number;
    periodicidadFacturacion?: number;
    maximoMonto?: number;
    empresa?: IEmpresa;
    registroCompras?: IRegistroCompra[];
    cuentaAsociadas?: ICuentaAsociada[];
    beneficios?: IBeneficio[];
    equipoEmpresas?: IEquipoEmpresas;
}

export class Facturacion implements IFacturacion {
    constructor(
        public id?: number,
        public titularFactura?: string,
        public tipoPersona?: number,
        public periodicidadFacturacion?: number,
        public maximoMonto?: number,
        public empresa?: IEmpresa,
        public registroCompras?: IRegistroCompra[],
        public cuentaAsociadas?: ICuentaAsociada[],
        public beneficios?: IBeneficio[],
        public equipoEmpresas?: IEquipoEmpresas
    ) {}
}
