package br.com.agora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.agora.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
