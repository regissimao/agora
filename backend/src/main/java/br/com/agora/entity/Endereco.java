package br.com.agora.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Embeddable;


@Embeddable
@Getter @Setter
public class Endereco {
	
	private String logradouro;
	
	private String rua;
	
	private int numero;
	
	private String completento;
	
	private String bairro;
	
	private String cidade;
}
