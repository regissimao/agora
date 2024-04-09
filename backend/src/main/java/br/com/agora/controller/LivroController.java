package br.com.agora.controller;

import br.com.agora.dto.request.CadastrarLivroRequest;
import br.com.agora.dto.request.PesquisaLivroRequest;
import br.com.agora.dto.response.CadastrarLivroResponse;
import br.com.agora.dto.response.ListarLivroResponse;
import br.com.agora.dto.response.PesquisaLivroResponse;
import br.com.agora.service.LivroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @GetMapping(value = "/listar-livro", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListarLivroResponse> listarLivros() {
        return ResponseEntity.ok(livroService.listarLivros());
    }

    @GetMapping(value = "/pesquisar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PesquisaLivroResponse> pesquisarLivros(@RequestBody PesquisaLivroRequest request) {
        return ResponseEntity.ok(livroService.pesquisarLivros(request.getTermoPesquisa()));
    }
}
