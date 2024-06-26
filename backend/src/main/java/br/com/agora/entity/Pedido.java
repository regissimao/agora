package br.com.agora.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_pedido")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_pedido")
    private Date dataPedido;

    @Column(name = "preco")
    private Double preco;

    @Column(name = "prazo_entrega")
    private Date prazoEntrega;

    @Column(name = "data_entrega")
    private Date dataEntrega;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Endereco> endereco;

    private String observacao;

    @Column(name = "statu_entrega")
    private String statusEntrega;

    @Column(name = "valor_frete")
    private String valorFrete;
    
    @ManyToOne()
    private Livro livro;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    private Pagamento pagamento;
}
