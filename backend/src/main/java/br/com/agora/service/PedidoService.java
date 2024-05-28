package br.com.agora.service;

import java.util.Date;
import java.util.List;

import br.com.agora.dto.PedidoDTO;
import br.com.agora.entity.Livro;
import br.com.agora.entity.Usuario;
import br.com.agora.repository.LivroRepository;
import br.com.agora.repository.UsuarioRepository;
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
    private final LivroRepository livroService;
    private final UsuarioRepository usuarioRepository;

    public List<Pedido> retornarTodos() {
        return pedidoRepository.findAll();
    }

    public RetornarResumoPedidoResponse retornarPedido(Long request) throws BadRequestException {
        Pedido pedido = pedidoRepository.findById(request).orElseThrow(() -> new BadRequestException("Pedido não existe."));
        return new RetornarResumoPedidoResponse(pedido);
    }

    public PedidoDTO criarPedido(String isbn, Usuario usuario) throws BadRequestException {
        Pedido pedido = new Pedido();
        usuario = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuario == null)
            throw new BadRequestException("Usuario não existe.");

        Livro  livro = livroService.findByIsbn(isbn);
        if (livro == null)
            throw new BadRequestException("Livro não existe.");

        List<Pedido> pedidos = pedidoRepository.findByUsuarioAndLivroIsbn(usuario, isbn);
        if (!pedidos.isEmpty())
            return new PedidoDTO(pedidos.get(0));

        pedido.setPreco(livro.getPrecoDigital());
        pedido.setDataPedido(new Date());
        pedido.setUsuario(usuario);
        pedido.setLivro(livro);
        return new PedidoDTO(pedidoRepository.save(pedido));
    }

    public void salvarPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }

    @DeleteMapping(path = "/{idpedido}")
    public void removerPedido(long idPedido) {
        pedidoRepository.deleteById(idPedido);
    }
}