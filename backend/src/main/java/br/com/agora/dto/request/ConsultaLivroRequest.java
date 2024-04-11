package br.com.agora.dto.request;

public class ConsultaLivroRequest {
    private String parametroDeConsulta;

    public ConsultaLivroRequest() {
    }

    public ConsultaLivroRequest(String parametroDeConsulta) {
        this.parametroDeConsulta = parametroDeConsulta;
    }

    public String getParametroDeConsulta() {
        return parametroDeConsulta;
    }

    public void setParametroDeConsulta(String parametroDeConsulta) {
        this.parametroDeConsulta = parametroDeConsulta;
    }
}
