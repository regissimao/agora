package br.com.agora.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_pedido")
public class Pedido {

    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "usuario_id")
    private Integer usuario;

    @Column(name = "livro_id")
    private Integer livros;

    @Column(name = "vendedor")
    private String vendedor;

    @Column(name = "pagamento_id")
    private Integer pagamento;

    @Column(name = "data_pedido")
    private LocalDateTime dataPedido;

    @Column(name = "preco")
    private Double preco;

    private LocalDateTime prazoEntrega;

    private LocalDateTime dataEntrega;

    private String endereco;

    private String observacao;

    private String statusEntrega;

    private String valorFrete;

}
