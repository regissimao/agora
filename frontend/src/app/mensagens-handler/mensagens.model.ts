export class  Mensagens {

  // Para as mensagens de sucesso, valor do atributo tipo é 1
  // Para as mensagens de erro, valor do atributo tipo é 2
  // Para as mensagens de alerta, valor do atributo tipo é 3

  tipo: number = 0;
  mensagens: string[] = [];
}
