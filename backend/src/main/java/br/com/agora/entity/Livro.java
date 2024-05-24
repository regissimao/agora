package br.com.agora.entity;

import java.util.Date;
import java.util.List;

import br.com.agora.dto.request.CadastrarLivroRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tb_livro")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Livro {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "isbn", nullable = false, length = 13)
	private String isbn;

	@ManyToMany(mappedBy = "livros", fetch = FetchType.LAZY)
	private List<Usuario> usuarios;

	@Column(name = "titulo", nullable = false)
	private String titulo;
	
	@Column(name = "autor", nullable = false)
	private String autor;
	
	private String sinopse;
	
	@Column(name = "editora", nullable = false)
	private String editora;
	
	@Column(name = "idioma", nullable = false)
	private String idioma;
	
	@Column(name = "categoria", nullable = false)
	private String categoria;
	
	@Column(name = "numero_pagina", nullable = false)
	private int numeroPagina;
	
	@Column(name = "data_publicacao")
	private String dataPublicacao;
	
	@Column(name = "peso_fisico")
	private Double precoFisico;
	
	@Column(name = "quantidade_estoque")
	private Integer quantidadeEstoque;
	
	@Column(name = "arquivo_digital")
	private String arquivoDigital;
	
	@Column(name = "preco_digital")
	private Double precoDigital;
	
	@Column(name = "capa_livro")
	private String capaLivro;

	@Column(name = "tipo_livro")
	private String tipoLivro;
	
	@OneToMany(mappedBy = "livro", fetch = FetchType.LAZY)
	private List<Pedido> pedidos;

	public Livro(CadastrarLivroRequest livroRequest, String pathCapa, String pathPdf) {
		this.isbn = livroRequest.getIsbn();
		this.titulo = livroRequest.getTitulo();
		this.autor = livroRequest.getAutor();
		this.editora = livroRequest.getEditora();
		this.categoria = livroRequest.getCategoria();
		this.sinopse = livroRequest.getSinopse();
		this.idioma = livroRequest.getIdioma();
		this.dataPublicacao = livroRequest.getDataPublicacao();
		this.precoFisico = livroRequest.getPrecoFisico();
		this.precoDigital = livroRequest.getPrecoDigital();
		this.quantidadeEstoque = livroRequest.getQuantidadeEstoque();
		this.arquivoDigital = pathPdf;
		this.capaLivro = pathCapa;
		this.tipoLivro = livroRequest.getTipoLivro();
		this.numeroPagina = livroRequest.getNumeroPagina();
		this.pedidos = null;
	}
}
