package br.com.agora.service;

import br.com.agora.dto.ListarLivroVO;
import br.com.agora.dto.request.AtualizarLivroRequest;
import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.response.*;
import br.com.agora.entity.Livro;
import br.com.agora.exception.BadRequestException;
import br.com.agora.repository.LivroRepository;
import br.com.agora.util.Diretorios;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {
    private final LivroRepository livroRepository;
    private final Diretorios diretorios;

    public ListarLivroResponse listarLivros() {
        List<Livro> livros = livroRepository.findAll();
        if (livros.isEmpty())
            throw new BadRequestException("Nenhum Livro Encontrado");
        List<ListarLivroVO> livroVOs = livros.stream()
                .map(livro -> new ListarLivroVO(livro.getIsbn(), livro.getTitulo()))
                .toList();
        return new ListarLivroResponse(livroVOs);
    }

    public PesquisaLivroResponse pesquisarLivros(String termoPesquisa) {
        List<Livro> livros = livroRepository.findByTituloContainingIgnoreCase(termoPesquisa);
        List<ListarLivroVO> livroVOs = livros.stream()
                .map(livro -> new ListarLivroVO(livro.getIsbn(), livro.getTitulo()))
                .toList();
        return new PesquisaLivroResponse(livroVOs);
    }

    public CadastrarLivroResponse cadastrarLivro(CadastrarLivroRequest livroRequest) throws IOException {
        String pathCapa = uploadCapa(livroRequest.getIsbn(), livroRequest.getCapaLivro());
        String pathPdf = uploadPdf(livroRequest.getIsbn(), livroRequest.getArquivoDigital());

        Livro livro = livroRepository.save(new Livro(livroRequest, pathCapa, pathPdf));
        return new CadastrarLivroResponse("Livro Cadastrado", livro);
    }

    public CadastrarLivroResponse atualizarLivro(AtualizarLivroRequest livroRequest) throws IOException {
        Livro livroExistente = livroRepository.findByIsbn(livroRequest.getIsbn());

        if (livroExistente == null) {
            throw new BadRequestException("Livro não encontrado");
        }

//        String pathCapa = livroExistente.getCapaLivro();
//        if (livroRequest.getCapaLivro() != null && !livroRequest.getCapaLivro().isEmpty()) {
//            pathCapa = uploadCapa(livroRequest.getIsbn(), livroRequest.getCapaLivro());
//        }
//
//        String pathPdf = livroExistente.getArquivoDigital();
//        if (livroRequest.getArquivoDigital() != null && !livroRequest.getArquivoDigital().isEmpty()) {
//            pathPdf = uploadPdf(livroRequest.getIsbn(), livroRequest.getArquivoDigital());
//        }

        livroExistente.setTitulo(livroRequest.getTitulo());
        livroExistente.setAutor(livroRequest.getAutor());
        livroExistente.setEditora(livroRequest.getEditora());
        livroExistente.setIdioma(livroRequest.getIdioma());
        livroExistente.setCategoria(livroRequest.getCategoria());
        livroExistente.setNumeroPagina(livroRequest.getNumeroPagina());
        livroExistente.setDataPublicacao(livroRequest.getDataPublicacao());
        livroExistente.setPrecoFisico(livroRequest.getPrecoFisico());
        livroExistente.setQuantidadeEstoque(livroRequest.getQuantidadeEstoque());
//        livroExistente.setArquivoDigital(pathPdf);
        livroExistente.setPrecoDigital(livroRequest.getPrecoDigital());
//        livroExistente.setCapaLivro(pathCapa);
        livroExistente.setTipoLivro(livroRequest.getTipoLivro());

        livroRepository.save(livroExistente);

        return new CadastrarLivroResponse("Livro atualizado com sucesso", livroExistente);
    }

    public Page<Livro> getAllBooks(PageRequest pageable) {
        return livroRepository.findAll(pageable);
    }

    public ObterLivroResponse obterLivroPorId(Long id) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Livro não encontrado"));

        return new ObterLivroResponse(livro);
    }
    
    public String uploadPdf(String isbnLivro, MultipartFile arquivo) throws IOException {
        String fileName = "pdf_livro_" + isbnLivro + ".pdf";
        return salvarArquivo(diretorios.getPathPdfLivro(), fileName, arquivo);
    }


    public String uploadCapa(String isbnLivro, MultipartFile arquivo) throws IOException {
        
        String fileName = "capa_livro_" + isbnLivro + ".jpg";
        return salvarArquivo(diretorios.getPathCapa(), fileName, arquivo);
    }

    public Resource downloadCapa(String isbn) throws MalformedURLException {

        Livro livro = livroRepository.findByIsbn(isbn);

        if (livro == null){
            throw new BadRequestException("Livro não encontrado");
        }

        Path path = Paths.get(livro.getCapaLivro());
        
        return new UrlResource(path.toUri());

    }


    public RetornarDadosLivroResponse retornarDadosLivro(String isbnLivro) {
          
        Livro livro = livroRepository.findByIsbn(isbnLivro);

        if (livro == null){
            throw new BadRequestException("Livro não encontrado");
        }

        return new RetornarDadosLivroResponse(livro);

    } 

    /*PRIVATE BLOCK*/
    private String salvarArquivo(String diretorio, String nomeArquivo, MultipartFile arquivo) throws IOException {
        Path caminhoDiretorio = Paths.get(diretorio);
        if (!Files.exists(caminhoDiretorio)) {
            Files.createDirectories(caminhoDiretorio);
        }
        try (var inputStream = arquivo.getInputStream()) {
            Path caminhoArquivo = caminhoDiretorio.resolve(nomeArquivo);
            Files.copy(inputStream, caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);
        }
        return diretorio + nomeArquivo;
    }


}
