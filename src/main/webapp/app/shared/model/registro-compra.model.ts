import { IMiembros } from 'app/shared/model/miembros.model';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { IReservas } from 'app/shared/model/reservas.model';

export interface IRegistroCompra {
    id?: number;
    miembros?: IMiembros;
    espacioLibre?: IEspacioLibre;
    entradaInvitados?: IEntradaInvitados;
    facturacion?: IFacturacion;
    reservas?: IReservas;
}

export class RegistroCompra implements IRegistroCompra {
    constructor(
        public id?: number,
        public miembros?: IMiembros,
        public espacioLibre?: IEspacioLibre,
        public entradaInvitados?: IEntradaInvitados,
        public facturacion?: IFacturacion,
        public reservas?: IReservas
    ) {}
}
