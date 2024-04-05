package br.com.agora.controller;

import br.com.agora.dto.request.BuscarPdfLivroRequest;
import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.request.RetornarLivroRequest;
import br.com.agora.dto.response.CadastrarLivroResponse;
import br.com.agora.dto.response.RetornarDadosLivroResponse;
import br.com.agora.service.LivroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.MalformedURLException;
import java.text.ParseException;

@RestController
@RequestMapping("/livro")
@RequiredArgsConstructor
public class LivroController {

    private final LivroService livroService;

    @PostMapping("/cadastrar")
    public ResponseEntity<CadastrarLivroResponse> cadastrarLivro(@ModelAttribute @Valid CadastrarLivroRequest request) throws IOException, ParseException {
        CadastrarLivroResponse response = livroService.cadastrarLivro(request);

        return ResponseEntity.ok(response);

    }

    @PostMapping("/retornar-livro")
    public ResponseEntity<RetornarDadosLivroResponse> retornarDadosLivro(@RequestBody @Valid RetornarLivroRequest request) throws IOException, ParseException {
        
        RetornarDadosLivroResponse response = livroService.retornarDadosLivro(request.getIsbn());

        return ResponseEntity.ok(response);

    }

    @PostMapping("/buscar-capa-livro")
    public ResponseEntity<Resource> buscarPdfLivro(@RequestBody @Valid BuscarPdfLivroRequest buscarPdfLivroRequest) throws MalformedURLException {
        Resource resource = livroService.downloadCapa(buscarPdfLivroRequest.getIsbn());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
        }


}