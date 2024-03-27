package br.com.agora.dto.response;

import br.com.agora.entity.Livro;

public record CadastrarLivroResponse(String message, Livro livro) {
}
