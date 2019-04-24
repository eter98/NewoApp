import { Moment } from 'moment';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { IInvitados } from 'app/shared/model/invitados.model';
import { IReservas } from 'app/shared/model/reservas.model';

export interface IEntradaInvitados {
    id?: number;
    fechaEntrada?: Moment;
    horaEntrada?: string;
    fechaSalida?: Moment;
    horaSalida?: string;
    espacioLibre?: IEspacioLibre;
    registroCompra?: IRegistroCompra;
    invitados?: IInvitados;
    reservas?: IReservas;
}

export class EntradaInvitados implements IEntradaInvitados {
    constructor(
        public id?: number,
        public fechaEntrada?: Moment,
        public horaEntrada?: string,
        public fechaSalida?: Moment,
        public horaSalida?: string,
        public espacioLibre?: IEspacioLibre,
        public registroCompra?: IRegistroCompra,
        public invitados?: IInvitados,
        public reservas?: IReservas
    ) {}
}
