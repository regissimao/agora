package br.com.agora.dto.response;

import br.com.agora.dto.ListarLivroVO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class PesquisaLivroResponse {
    private List<ListarLivroVO> livros;
}
