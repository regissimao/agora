package br.com.agora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.agora.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {
}
