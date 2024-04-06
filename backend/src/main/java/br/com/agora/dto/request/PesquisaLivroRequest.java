package br.com.agora.dto.request;

public class PesquisaLivroRequest {
    private String termoPesquisa;


    public PesquisaLivroRequest() {
    }

    public PesquisaLivroRequest(String termoPesquisa) {
        this.termoPesquisa = termoPesquisa;
    }

    public String getTermoPesquisa() {
        return termoPesquisa;
    }

    public void setTermoPesquisa(String termoPesquisa) {
        this.termoPesquisa = termoPesquisa;
    }
}
