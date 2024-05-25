package br.com.agora.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.agora.entity.Avaliar;
import br.com.agora.repository.AvaliarRepository;

public class AvaliarService {
	@Autowired
	private AvaliarRepository avaliarRepository;

    public List<Avaliar> findAll() {
        return avaliarRepository.findAll();
    }

    public Avaliar findById(Long id) {
        return avaliarRepository.findById(id).orElse(null);
    }

    public Avaliar save(Avaliar avaliar) {
        return avaliarRepository.save(avaliar);
    }

    public void deleteById(Long id) {
        avaliarRepository.deleteById(id);
    }
}
