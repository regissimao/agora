package br.com.agora.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RetornarResumoPedidoRequest {
    @NotNull(message = "Pedido deve ser informado")
    private Long pedidoId;
}
