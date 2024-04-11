package br.com.agora.controller;

import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.request.PesquisaLivroRequest;
import br.com.agora.dto.response.CadastrarLivroResponse;
import br.com.agora.entity.Livro;
import br.com.agora.dto.response.ListarLivroResponse;
import br.com.agora.dto.response.PesquisaLivroResponse;
import br.com.agora.service.LivroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/livro")
@RequiredArgsConstructor
@Tag(name = "LivroController", description = "Controller para operações de livros")
public class LivroController {

    private final LivroService livroService;

    @Operation(summary = "Cadastrar um novo livro", description = "Cadastra um novo livro e retorna os detalhes do livro cadastrado")
    @ApiResponse(responseCode = "200", description = "Livro cadastrado com sucesso", content = @Content(schema = @Schema(implementation = CadastrarLivroResponse.class)))
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
    }
    @Operation(summary = "Listar livros", description = "Retorna uma lista de todos os livros disponíveis")
    @ApiResponse(responseCode = "200", description = "Livros listados com sucesso", content = @Content(schema = @Schema(implementation = ListarLivroResponse.class)))
    @GetMapping(value = "/listar-livro", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListarLivroResponse> listarLivros() {
        return ResponseEntity.ok(livroService.listarLivros());
    }

    @Operation(summary = "Pesquisar livros", description = "Pesquisa livros com base em um termo de pesquisa")
    @ApiResponse(responseCode = "200", description = "Pesquisa realizada com sucesso", content = @Content(schema = @Schema(implementation = PesquisaLivroResponse.class)))
    @GetMapping(value = "/pesquisar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PesquisaLivroResponse> pesquisarLivros(@RequestBody PesquisaLivroRequest request) {
        return ResponseEntity.ok(livroService.pesquisarLivros(request.getTermoPesquisa()));
    }
}
