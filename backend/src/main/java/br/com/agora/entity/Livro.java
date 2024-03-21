package br.com.agora.entity;

import java.util.Date;

import jakarta.persistence.Column;
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
	
	@Column(name = "isbn", nullable = false)
	private String isbn;
	
	@Column(name = "titulo", nullable = false)
	private String titulo;
	
	@Column(name = "autor", nullable = false)
	private String autor;
	
	private String sinope;
	
	@Column(name = "editora", nullable = false)
	private String editora;
	
	@Column(name = "idioma", nullable = false)
	private String idioma;
	
	@Column(name = "categoria", nullable = false)
	private String categoria;
	
	@Column(name = "numero_pagina", nullable = false)
	private int numeroPagina;
	
	@Column(name = "data_publicacao")
	private Date dataPublicacao;
	
	private String dimensao;
	
	private double peso;
	
	@Column(name = "peso_fisico")
	private double precoFisico;
	
	@Column(name = "quantidade_estoque")
	private int quantidadeEstoque;
	
	@Column(name = "arquivo_digital")
	private String arquivoDigital;
	
	@Column(name = "preco_digital")
	private double precoDigital;
	
	@Column(name = "capa_livro")
	private String capaLivro;
	
	@Column(name = "livro_digital")
	private Boolean livroDigital;
	
	@Column(name = "livro_fisico")
	private Boolean livroFisico;
	
	private Livro() {};

	
}
