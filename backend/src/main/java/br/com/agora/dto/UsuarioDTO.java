package br.com.agora.dto;

import java.time.LocalDate;

import br.com.agora.entity.Usuario;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter @Setter
public class UsuarioDTO {
	
	private Long id;

	private String nome;

    private String cpfCpnj;

    private LocalDate dataNascimento;

    private String email;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.cpfCpnj = usuario.getCpfCpnj();
        this.dataNascimento = usuario.getDataNascimento();
        this.email = usuario.getEmail();
    }
}
