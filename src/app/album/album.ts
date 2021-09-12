export class Album {

    id: number;
    titulo: string;
    anio: number;
    descripcion: string;
    medio: Medio;
    genero: Generos;
    usuario: number;
    interpretes: Array<string>;
    canciones: Array<Cancion>

    constructor(
        id: number,
        titulo: string,
        anio: number,
        descripcion: string,
        medio: Medio,
        genero: Generos,
        usuario: number,
        interpretes: Array<string>,
        canciones: Array<Cancion>
    ){
        this.id = id,
        this.titulo = titulo,
        this.anio = anio,
        this.descripcion = descripcion,
        this.medio = medio,
        this.genero = genero,
        this.usuario = usuario,
        this.interpretes = interpretes,
        this.canciones = canciones
    }
}

export class Medio{
    llave: string;
    valor: number

    constructor(
        llave: string,
        valor:number
    ){
        this.llave = llave,
        this.valor = valor
    }
}
/*
  Se lista los generos musicales
 */
export class Generos{
  llave: string;
  constructor(llave: string){
    this.llave = llave
  }
}

export class Cancion{
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete
    }
}
