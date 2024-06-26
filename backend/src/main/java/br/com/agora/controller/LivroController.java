package br.com.agora.controller;

import br.com.agora.dto.request.*;
import br.com.agora.dto.response.*;
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

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/livro")
@RequiredArgsConstructor
@Tag(name = "LivroController", description = "Controller para operações de livros")
public class LivroController {

    private final LivroService livroService;

    @Operation(summary = "Cadastrar um novo livro", description = "Cadastra um novo livro e retorna os detalhes do livro cadastrado")
    @ApiResponse(responseCode = "200", description = "Livro cadastrado com sucesso", content = @Content(schema = @Schema(implementation = CadastrarLivroResponse.class)))
    @PostMapping
    public ResponseEntity<CadastrarLivroResponse> cadastrarLivro(@ModelAttribute @Valid CadastrarLivroRequest request) throws IOException, ParseException {
        CadastrarLivroResponse response = livroService.cadastrarLivro(request);
        return ResponseEntity.ok(response);

    }

    @Operation(summary = "Atualizar um livro", description = "Atualiza os detalhes de um livro existente")
    @ApiResponse(responseCode = "200", description = "Livro atualizado com sucesso", content = @Content(schema = @Schema(implementation = CadastrarLivroResponse.class)))
    @PutMapping
    public ResponseEntity<CadastrarLivroResponse> atualizarLivro(@ModelAttribute @Valid AtualizarLivroRequest request) throws IOException, ParseException {
        CadastrarLivroResponse response = livroService.atualizarLivro(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obter detalhes de um livro pelo ID", description = "Retorna os detalhes de um livro específico pelo ID")
    @ApiResponse(responseCode = "200", description = "Detalhes do livro retornados com sucesso", content = @Content(schema = @Schema(implementation = RetornarDadosLivroResponse.class)))
    @GetMapping("/{id}")
    public ResponseEntity<ObterLivroResponse> obterLivroPorId(@PathVariable Long id) {
        ObterLivroResponse response = livroService.obterLivroPorId(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/retornar-livro/{isbn}")
    public ResponseEntity<RetornarDadosLivroResponse> retornarDadosLivro(@PathVariable String isbn) {

        RetornarDadosLivroResponse response = livroService.retornarDadosLivro(isbn);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{isbn}/downloadCapa")
    public ResponseEntity<Resource> downloadCapa(@PathVariable String isbn) throws MalformedURLException {
        Resource resource = livroService.downloadCapa(isbn);

        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        headers.set("Content-Disposition", "inline; filename=\"" + resource.getFilename() + "\"");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @GetMapping("/{isbn}/downloadPdf")
    public ResponseEntity<Resource> downloadPdf(@PathVariable String isbn) throws MalformedURLException {
        Resource resource = livroService.downloadPdf(isbn);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/listar")
    public ResponseEntity<Map<String, Object>> listarLivros(
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "quantidade", defaultValue = "20") int quantidade) {
        PageRequest pageable = PageRequest.of(pagina, quantidade);
        Page<Livro> pageLivros = livroService.getAllBooks(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("livros", pageLivros.getContent());
        response.put("totalItems", pageLivros.getTotalElements());
        response.put("totalPages", pageLivros.getTotalPages());
        response.put("currentPage", pageLivros.getNumber());

        return ResponseEntity.ok(response);
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

    @Operation(summary = "Remover um livro", description = "Remove um livro pelo ID")
    @ApiResponse(responseCode = "200", description = "Livro removido com sucesso", content = @Content(schema = @Schema(implementation = RemoverLivroResponse.class)))
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerLivro (@PathVariable Long id) {

        return ResponseEntity.ok(livroService.removerLivro(id));
    }
}
