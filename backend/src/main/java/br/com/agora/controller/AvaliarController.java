package br.com.agora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.agora.entity.Avaliar;
import br.com.agora.service.AvaliarService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliarController {
	@Autowired
    private AvaliarService avaliarService;

    @GetMapping
    public List<Avaliar> getAllAvaliacoes() {
        return avaliarService.findAll();
    }

    @GetMapping("/{id}")
    public Avaliar getAvaliacaoById(@PathVariable Long id) {
        return avaliarService.findById(id);
    }

    @PostMapping
    public Avaliar createAvaliacao(@RequestBody Avaliar avaliar) {
        return avaliarService.save(avaliar);
    }

    @DeleteMapping("/{id}")
    public void deleteAvaliacao(@PathVariable Long id) {
        avaliarService.deleteById(id);
    }
}
