
export class Usuario {
  email: string = "";
  senha: string = "";
}


export class Pedido {
  id: number = 0;
  dataPedido: Date = new Date();
  preco: number = 0;
  quantidade: number = 0;
  prazoEntrega: Date = new Date();
  dataEntrega: Date = new Date();
  observacao: string = "";
  statusEntrega: string = "";
  valorFrete: string = "";
  endereco: Endereco[] = [];
  usuario: Usuario[] = [];
  pagamento: Pagamento[] = [];
  livro: Livro[] = [];
}

export class Pagamento {
  id: number = 0;
  status: boolean = false;
  tipo: boolean = false;
  dataPedido: Date = new Date();
}

export class Livro {
  id: number = 0;
  isbn: string = "";
  titulo: string = "";
  autor: string = "";
  sinopse: string = "";
  editora: string = "";
  idioma: string = "";
  categoria: string = "";
  numeroPagina: number = 0;
  dataPublicacao: Date = new Date();
  precoFisico: number = 0;
  quantidadeEstoque: number = 0;
  arquivoDigital: string = "";
  precoDigital: number = 0;
  capaLivro: string = "";
  tipoLivro: string = "";
}


class Endereco{
  logradouro: string = "";
  numero: string = "";
  cidade: string = "";
  cep: string = "";
  complemento: string = "";
  estado: string = "";
}