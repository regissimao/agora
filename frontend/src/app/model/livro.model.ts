export class Livro {
  private _id?: number;
  private _isbn: string;
  private _titulo: string;
  private _autor: string;
  private _sinopse?: string;
  private _editora: string;
  private _idioma: string;
  private _categoria: string;
  private _numeroPagina: number;
  private _dataPublicacao?: Date;
  private _precoFisico?: number;
  private _quantidadeEstoque?: number;
  private _arquivoDigital?: string;
  private _precoDigital?: number;
  private _capaLivro?: string;
  private _tipoLivro: string;

  constructor(init?: Partial<Livro>) {
    this._id = init?.id;
    this._isbn = init?.isbn ?? '';
    this._titulo = init?.titulo ?? '';
    this._autor = init?.autor ?? '';
    this._sinopse = init?.sinopse;
    this._editora = init?.editora ?? '';
    this._idioma = init?.idioma ?? '';
    this._categoria = init?.categoria ?? '';
    this._numeroPagina = init?.numeroPagina ?? 0;
    this._dataPublicacao = init?.dataPublicacao;
    this._precoFisico = init?.precoFisico;
    this._quantidadeEstoque = init?.quantidadeEstoque;
    this._arquivoDigital = init?.arquivoDigital;
    this._precoDigital = init?.precoDigital;
    this._capaLivro = init?.capaLivro;
    this._tipoLivro = init?.tipoLivro ?? '';
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get autor(): string {
    return this._autor;
  }

  set autor(value: string) {
    this._autor = value;
  }

  get sinopse(): string | undefined {
    return this._sinopse;
  }

  set sinopse(value: string | undefined) {
    this._sinopse = value;
  }

  get editora(): string {
    return this._editora;
  }

  set editora(value: string) {
    this._editora = value;
  }

  get idioma(): string {
    return this._idioma;
  }

  set idioma(value: string) {
    this._idioma = value;
  }

  get categoria(): string {
    return this._categoria;
  }

  set categoria(value: string) {
    this._categoria = value;
  }

  get numeroPagina(): number {
    return this._numeroPagina;
  }

  set numeroPagina(value: number) {
    this._numeroPagina = value;
  }

  get dataPublicacao(): Date | undefined {
    return this._dataPublicacao;
  }

  set dataPublicacao(value: Date | undefined) {
    this._dataPublicacao = value;
  }

  get precoFisico(): number | undefined {
    return this._precoFisico;
  }

  set precoFisico(value: number | undefined) {
    this._precoFisico = value;
  }

  get quantidadeEstoque(): number | undefined {
    return this._quantidadeEstoque;
  }

  set quantidadeEstoque(value: number | undefined) {
    this._quantidadeEstoque = value;
  }

  get arquivoDigital(): string | undefined {
    return this._arquivoDigital;
  }

  set arquivoDigital(value: string | undefined) {
    this._arquivoDigital = value;
  }

  get precoDigital(): number | undefined {
    return this._precoDigital;
  }

  set precoDigital(value: number | undefined) {
    this._precoDigital = value;
  }

  get capaLivro(): string | undefined {
    return this._capaLivro;
  }

  set capaLivro(value: string | undefined) {
    this._capaLivro = value;
  }

  get tipoLivro(): string {
    return this._tipoLivro;
  }

  set tipoLivro(value: string) {
    this._tipoLivro = value;
  }
}
