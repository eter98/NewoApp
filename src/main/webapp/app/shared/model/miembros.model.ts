import { Moment } from 'moment';
import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { IHostSede } from 'app/shared/model/host-sede.model';
import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';
import { IInvitados } from 'app/shared/model/invitados.model';
import { IReservas } from 'app/shared/model/reservas.model';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

export interface IMiembros {
    id?: number;
    nombre?: string;
    apellido?: string;
    nacionalidad?: string;
    fevhaNacimiento?: Moment;
    fechaRegistro?: Moment;
    genero?: string;
    correoElectronico?: string;
    celular?: string;
    idEquipoEmprearial?: number;
    idSede?: number;
    derechosDeCompra?: number;
    tipoAcceso?: number;
    perfilMiembro?: IPerfilMiembro;
    espacioLibre?: IEspacioLibre;
    hostSede?: IHostSede;
    entradaMiembros?: IEntradaMiembros[];
    invitados?: IInvitados[];
    reservas?: IReservas[];
    registroCompra?: IRegistroCompra;
    equipoEmpresas?: IEquipoEmpresas;
}

export class Miembros implements IMiembros {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public nacionalidad?: string,
        public fevhaNacimiento?: Moment,
        public fechaRegistro?: Moment,
        public genero?: string,
        public correoElectronico?: string,
        public celular?: string,
        public idEquipoEmprearial?: number,
        public idSede?: number,
        public derechosDeCompra?: number,
        public tipoAcceso?: number,
        public perfilMiembro?: IPerfilMiembro,
        public espacioLibre?: IEspacioLibre,
        public hostSede?: IHostSede,
        public entradaMiembros?: IEntradaMiembros[],
        public invitados?: IInvitados[],
        public reservas?: IReservas[],
        public registroCompra?: IRegistroCompra,
        public equipoEmpresas?: IEquipoEmpresas
    ) {}
}
