
export class Usuario {
  email: string = "";
  senha: string = "";
}


export interface Endereco {
  logradouro: string;
  numero: number;
  cidade: string;
  cep: string;
  complemento: string;
  estado: string;
}

export interface Livro {
  id: number;
  isbn: string;
  titulo: string;
  autor: string;
  sinopse: string;
  editora: string;
  idioma: string;
  categoria: string;
  numeroPagina: number;
  dataPublicacao: Date;
  precoFisico: number;
  quantidadeEstoque: number;
  arquivoDigital: string;
  precoDigital: number;
  capaLivro: string;
  tipoLivro: string;
}

export interface Usuario {
  id: number;
  email: string;
  senha: string;
}

export interface Pagamento {
  id: number;
  status: boolean;
  tipo: boolean;
  dataPedido: Date;
}

export interface Pedido {
  id: number;
  dataPedido: Date;
  preco: number;
  prazoEntrega: Date;
  dataEntrega: Date;
  endereco: Endereco[];
  observacao: string;
  statusEntrega: string;
  valorFrete: string;
  livro: Livro;
  usuario: Usuario;
  pagamento: Pagamento;
}
