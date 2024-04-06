package br.com.agora.dto.response;

import br.com.agora.dto.LivroDTO;
import java.util.List;

public class PesquisaLivroResponse {
    private List<LivroDTO> livros;


    public PesquisaLivroResponse() {
    }

    public PesquisaLivroResponse(List<LivroDTO> livros) {
        this.livros = livros;
    }

    public List<LivroDTO> getLivros() {
        return livros;
    }

    public void setLivros(List<LivroDTO> livros) {
        this.livros = livros;
    }
}
