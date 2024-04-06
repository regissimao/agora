package br.com.agora.controller;

import br.com.agora.dto.ConsultaLivroRequestDTO;
import br.com.agora.dto.ConsultaLivroResponseDTO;
import br.com.agora.dto.PesquisaLivroRequestDTO;
import br.com.agora.dto.PesquisaLivroResponseDTO;
import br.com.agora.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsultaLivroController {

    private final LivroService livroService;

    // Endpoint para consulta de livros
    @GetMapping("/livro/consultar")
    public ConsultaLivroResponseDTO consultarLivros() {
        return livroService.consultarLivros();
    }

    // Endpoint para pesquisa de livros
    @GetMapping("/livro/pesquisar")
    public PesquisaLivroResponseDTO pesquisarLivros(@RequestBody PesquisaLivroRequestDTO request) {
        return livroService.pesquisarLivros(request.getTermoPesquisa());
    }
}
