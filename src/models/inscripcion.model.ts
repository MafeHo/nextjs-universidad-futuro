import { EventoModel } from "./evento.model";

export interface Inscripcion {
    id: number;
    fecha: string;
    asistencia: string;
    eventoId: number;
    participanteId: number;
    feedbackId: number | null;
    certificadoId: number | null;
    evento: EventoModel;
}
