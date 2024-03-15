package br.com.agora.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
@Table(name="tb_livro")
public class Livro {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String isbn;
	
	private String titulo;
	
	private String autor;
	
	private String sinope;
	
	private String editora;
	
	private String idioma;
	
	private String categoria;
	
	private int numeroPagina;
	
	private Date dataPublicacao;
	
	private String dimensao;
	
	private double peso;
	
	private double precoFisico;
	
	private int qtdEstoque;
	
	private String arquivoDigital;
	
	private double precoDigital;
	
	private String capaLivro;
	
	private Boolean livroDigital;
	
	private Boolean livroFisico;
	
	private Livro() {};

	
}
