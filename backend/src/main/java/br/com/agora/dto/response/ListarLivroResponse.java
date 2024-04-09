package br.com.agora.dto.response;


import br.com.agora.dto.ListarLivroVO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ListarLivroResponse {

    List<ListarLivroVO> retorno;

}
