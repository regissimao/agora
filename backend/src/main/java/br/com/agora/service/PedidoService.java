package br.com.agora.service;

import java.util.List;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import br.com.agora.dto.response.RetornarResumoPedidoResponse;
import br.com.agora.entity.Pedido;
import br.com.agora.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public List<Pedido> retornarTodos() {
        return pedidoRepository.findAll();
    }

    public RetornarResumoPedidoResponse retornarPedido(Long request) throws BadRequestException {
        Pedido pedido = pedidoRepository.findById(request).orElseThrow(() -> new BadRequestException("Pedido não existe."));
        return new RetornarResumoPedidoResponse(pedido);
    }

    public void salvarPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }

    @DeleteMapping(path = "/{idpedido}")
    public void removerPedido(long idPedido) {
        pedidoRepository.deleteById(idPedido);
    }
}