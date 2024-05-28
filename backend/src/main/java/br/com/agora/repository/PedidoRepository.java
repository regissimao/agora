package br.com.agora.repository;

import br.com.agora.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.agora.entity.Pedido;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByUsuarioAndLivroIsbn(Usuario usuario, String isbn);

}