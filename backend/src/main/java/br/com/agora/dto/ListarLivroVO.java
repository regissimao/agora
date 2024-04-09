package br.com.agora.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListarLivroVO {
    private String isbn;
    private String titulo;
}
