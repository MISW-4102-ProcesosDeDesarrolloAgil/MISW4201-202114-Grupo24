export class Cancion {
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;
    favorita: boolean;
    genero: Generos;
    albumes: Array<any>

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string,
        favorita: boolean,
        genero: Generos,
        albumes: Array<any>
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete,
        this.favorita = favorita,
        this.genero = genero
        this.albumes = albumes
    }
}

export class Generos{
  llave: string;
  constructor(llave: string){
    this.llave = llave
  }
}
