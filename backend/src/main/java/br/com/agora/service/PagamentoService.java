package br.com.agora.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import br.com.agora.entity.Pagamento;
import br.com.agora.repository.PagamentoRepository;

@Service
public class PagamentoService {
	
	@Autowired
	private PagamentoRepository pagamentoRepository;
	
	public PagamentoService() {}
	
	public List<Pagamento> retornarTodos(){
		
	return (List<Pagamento>) pagamentoRepository.findAll();
			
}
	public Optional<Pagamento> retornarPagamento(int idPagamento) {
		return pagamentoRepository.findById(idPagamento);
	}
	
	public void salvarPagamento (Pagamento pag) {
		pagamentoRepository.save(pag);
	}

	@DeleteMapping(path="/{idPagamento}")
	public void removerPagamento(int idPagamento) {
		pagamentoRepository.deleteById(idPagamento);
	}
}