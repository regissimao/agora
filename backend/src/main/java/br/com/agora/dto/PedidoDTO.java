package br.com.agora.dto;

import br.com.agora.entity.Endereco;
import br.com.agora.entity.Pedido;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor @AllArgsConstructor
public class PedidoDTO {

    private Long id;

    private Date dataPedido;

    private Double preco;

    private Date prazoEntrega;

    private Date dataEntrega;

    private List<Endereco> endereco;

    private String observacao;

    private String statusEntrega;

    private String valorFrete;

    private String isbn;

    private UsuarioDTO usuario;

    private PagamentoDTO pagamento;

    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.dataPedido = pedido.getDataPedido();
        this.preco = pedido.getPreco();
        this.prazoEntrega = pedido.getPrazoEntrega();
        this.dataEntrega = pedido.getDataEntrega();
        this.endereco = pedido.getEndereco();
        this.observacao = pedido.getObservacao();
        this.statusEntrega = pedido.getStatusEntrega();
        this.valorFrete = pedido.getValorFrete();
        this.isbn = pedido.getLivro().getIsbn();
        this.usuario = new UsuarioDTO(pedido.getUsuario());
    }
}