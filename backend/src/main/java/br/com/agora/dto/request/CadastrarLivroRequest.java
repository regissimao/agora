package br.com.agora.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CadastrarLivroRequest {
    @NotNull(message = "Capa do livro não pode ser nulo")
    private MultipartFile capaLivro;
    @NotNull(message = "Arquivo Digital do livro não pode ser nulo")
    private MultipartFile arquivoDigital;
    @NotBlank(message = "ISBN deve ser informado. Você é informou: ${validatedValue}")
    @Size(min = 13, max = 13, message = "ISBN deve ter {max} caracteres.")
    private String isbn;
    @NotBlank(message = "Titulo deve ser informado")
    private String titulo;
    @NotBlank(message = "Autor deve ser informado")
    private String autor;
    @NotBlank(message = "Editora deve ser informada")
    private String editora;
    @NotBlank(message = "Categoria deve ser informada")
    private String categoria;
    @NotBlank(message = "Sinopse deve ser informada")
    private String sinopse;
    @NotBlank(message = "Idioma deve ser informado")
    private String idioma;
    @NotNull(message = "Data deve ser informada")
    private Date dataPublicacao;
    @NotBlank(message = "Tipo deve ser informado")
    private String tipoLivro;
    private Double precoDigital;
    private Double precoFisico;
    private Integer numeroPagina;
    private Integer quantidadeEstoque;

}
