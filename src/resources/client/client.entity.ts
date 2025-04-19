export enum ClientStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}
export interface Client {
  clienteId: number;
  clienteNombre: string;
  tipoClienteId: number;
  clienteUsuario: string;
  clientePass: string;
  clienteEstado: ClientStatus;
  clienteCuit: number;
  clienteDireccion: string;
  paisId: number;
  provinciaId: number;
  localidadId: number;
  rolId: number;
  clienteTel: string;
  clienteMail: string;
  fechaAlta: string; // ISO 8601 date string
  fechaModif: string | null; // ISO 8601 date string or null
  fechaBaja: string | null; // ISO 8601 date string or null
}