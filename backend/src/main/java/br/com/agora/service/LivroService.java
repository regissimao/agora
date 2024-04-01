package br.com.agora.service;

import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.response.CadastrarLivroResponse;
import br.com.agora.entity.Livro;
import br.com.agora.exception.BadRequestException;
import br.com.agora.repository.LivroRepository;
import br.com.agora.util.Diretorios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livrosRepository;
    private final Diretorios diretorios;


    public CadastrarLivroResponse cadastrarLivro(CadastrarLivroRequest livroRequest) throws IOException {
        Date data;
        String pathCapa = uploadCapa(livroRequest.getIsbn(), livroRequest.getCapaLivro());
        String pathPdf = uploadPdf(livroRequest.getIsbn(), livroRequest.getArquivoDigital());
        try {
            data = new SimpleDateFormat("yyyy-MM-dd").parse(livroRequest.getDataPublicacao());
        } catch (ParseException e) {
            throw new BadRequestException(" Data de publicação inválida. Formato esperado: yyyy-MM-dd");
        }

        Livro livro = livrosRepository.save(new Livro(livroRequest, pathCapa, pathPdf, data));
        return new CadastrarLivroResponse("Livro Cadastrado", livro);
    }

    public String uploadPdf(String isbnLivro, MultipartFile arquivo) throws IOException {
        String fileName = "pdf_livro_" + isbnLivro + ".pdf";
        return salvarArquivo(diretorios.getPathPdfLivro(), fileName, arquivo);
    }
    public String uploadCapa(String isbnLivro, MultipartFile arquivo) throws IOException {

        String fileName = "capa_livro_" + isbnLivro + ".jpg";
        return salvarArquivo(diretorios.getPathCapa(), fileName, arquivo);
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
