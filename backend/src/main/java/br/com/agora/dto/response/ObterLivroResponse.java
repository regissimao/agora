package br.com.agora.dto.response;

import br.com.agora.entity.Livro;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ObterLivroResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String isbn;
    private String titulo;
    private String autor;
    private String sinopse;
    private String editora;
    private String idioma;
    private String categoria;
    private int numeroPagina;
    private String dataPublicacao;
    private double precoFisico;
    private int quantidadeEstoque;
    private String arquivoDigital;
    private double precoDigital;
    private String capaLivro;
    private String tipoLivro;

    public ObterLivroResponse(Livro livro) {
        this.isbn = livro.getIsbn();
        this.titulo = livro.getTitulo();
        this.sinopse = livro.getSinopse();
        this.autor = livro.getAutor();
        this.categoria = livro.getCategoria();
        this.precoFisico = livro.getPrecoFisico();
        this.precoDigital = livro.getPrecoDigital();
        this.numeroPagina = livro.getNumeroPagina();
        this.quantidadeEstoque = livro.getQuantidadeEstoque();
        this.dataPublicacao = livro.getDataPublicacao();
        this.idioma = livro.getIdioma();
        this.editora = livro.getEditora();
        this.arquivoDigital = livro.getArquivoDigital();
        this.capaLivro = livro.getCapaLivro();
        this.tipoLivro = livro.getTipoLivro();
    }
}
