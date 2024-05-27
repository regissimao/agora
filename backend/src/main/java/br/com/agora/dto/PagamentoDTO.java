package br.com.agora.dto;


import br.com.agora.entity.Pagamento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagamentoDTO {
    private int id;

    private  boolean status;

    private  boolean tipo;

    private Date dataPedido;

    public PagamentoDTO(Pagamento pagamento) {
        this.id = pagamento.getId();
        this.status = pagamento.isStatus();
        this.tipo = pagamento.isTipo();
        this.dataPedido = pagamento.getDataPedido();
    }
}
