export interface Hability {
    name: string
    description: string
    subhabilities: Subhability[]
  }
  
  export interface Subhability {
    name: string
    descripcion: string
    badge: Badge
    percent: number
  }
  
  export interface Badge {
    color: string
    text: string
  }
  