package br.com.agora.dto.response;
import java.util.Date;

import br.com.agora.entity.Livro;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RetornarDadosLivroResponse {

    private String isbn;

	private String titulo;
	
	private String autor;

    private String sinopse;

    private String categoria;

    private Double precoFisico;
	
	private Double precoDigital;
    
	private Integer quantidadeEstoque;

    private Date dataPublicacao;

	private String idioma;


	public RetornarDadosLivroResponse(Livro livro) {
		this.isbn = livro.getIsbn();
		this.titulo = livro.getTitulo();
		this.sinopse = livro.getSinopse();
		this.autor = livro.getAutor();
		this.categoria = livro.getCategoria();
		this.precoFisico = livro.getPrecoFisico();
		this.precoDigital = livro.getPrecoDigital();
		this.quantidadeEstoque = livro.getQuantidadeEstoque();
		this.dataPublicacao = livro.getDataPublicacao();
		this.idioma = livro.getIdioma();

	}

}
