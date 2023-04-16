export interface Topic {
  id: number,
  admin_id: number,
  titulo: string,
  descripcion: string,
  accessomensajesprev: boolean,
  cod: string,
  fechacreacion: Date | null | undefined
}

export interface TopicParam {
  
}
