package br.com.agora.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioDTO {
	
	private Long id;

	private String nome;

    private String cpfCpnj;

    private LocalDate dataNascimento;

    private String email;
}
