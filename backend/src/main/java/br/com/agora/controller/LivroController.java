package br.com.agora.controller;

import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.response.CadastrarLivroResponse;
import br.com.agora.entity.Livro;
import br.com.agora.service.LivroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;


import java.io.IOException;
import java.text.ParseException;
import java.util.List;

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

    @GetMapping("/listar")
    public ResponseEntity<List<Livro>> listarLivros(
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "quantidade", defaultValue = "20") int quantidade) {
        Pageable pageable = PageRequest.of(pagina, quantidade);
        List<Livro> livros = livroService.getAllBooks(pageable);
        return ResponseEntity.ok(livros);
    }}
