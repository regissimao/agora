package br.com.agora.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_usuario")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tb_livro_usuario", joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "livro_id"))
    private List<Livro> livros;

    @Column(name = "cpf_cnpj", nullable = false, unique = true)
    private String cpfCpnj;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;
    
    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<Pagamento> pagamentos;
    
	@OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
	private List<Pedido> pedidos;

}
