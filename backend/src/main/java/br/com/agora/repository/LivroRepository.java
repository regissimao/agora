package br.com.agora.repository;

import br.com.agora.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByAutor(String autor);
    //possib de add outros métodos de consulta personalizada aqui
}
