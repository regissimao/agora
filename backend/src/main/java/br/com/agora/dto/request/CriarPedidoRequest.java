package br.com.agora.dto.request;

import br.com.agora.entity.Usuario;
import lombok.Data;

@Data
public class CriarPedidoRequest {

    private String isbn;

    private Usuario usuario;
}