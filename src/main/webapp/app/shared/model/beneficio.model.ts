import { IFacturacion } from 'app/shared/model/facturacion.model';

export interface IBeneficio {
    id?: number;
    tipoBeneficio?: string;
    descuento?: number;
    facturacion?: IFacturacion;
}

export class Beneficio implements IBeneficio {
    constructor(public id?: number, public tipoBeneficio?: string, public descuento?: number, public facturacion?: IFacturacion) {}
}
