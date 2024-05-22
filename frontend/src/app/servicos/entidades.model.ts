
export class Usuario {
  email: string = "";
  senha: string = "";
}


export class Compra {
  id:number = 0;
  titulo: string = "";
  isbn: string = "";
  autor: string = "";
  imagemUrl: string = "";
  preco: string = "";
  quantidade:number = 0;
  endereco: Endereco[] = [];
}

class Endereco{
  logradouro: string = "";
  numero: string = "";
  cidade: string = "";
  cep: string = "";
  complemento: string = "";
  estado: string = "";
}