package br.com.agora.dto.response;

import br.com.agora.dto.PagamentoDTO;
import br.com.agora.dto.UsuarioDTO;
import br.com.agora.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class RetornarResumoPedidoResponse {
    private Long id;

    private Date dataPedido;

    private Double preco;

    private Date prazoEntrega;

    private Date dataEntrega;

    private List<Endereco> endereco;

    private String observacao;

    private String statusEntrega;

    private String valorFrete;

    private Livro livro;

    private UsuarioDTO usuario;

    private PagamentoDTO pagamento;

    public RetornarResumoPedidoResponse(Pedido pedido) {
        this.id = pedido.getId();
        this.dataPedido = pedido.getDataPedido();
        this.preco = pedido.getPreco();
        this.prazoEntrega = pedido.getPrazoEntrega();
        this.dataEntrega = pedido.getDataEntrega();
        this.endereco = pedido.getEndereco();
        this.observacao = pedido.getObservacao();
        this.statusEntrega = pedido.getStatusEntrega();
        this.valorFrete = pedido.getValorFrete();
        this.livro = pedido.getLivro();
        this.usuario = new UsuarioDTO(pedido.getUsuario());
        if (pedido.getPagamento() != null)
            this.pagamento = new PagamentoDTO(pedido.getPagamento());
    }
}
