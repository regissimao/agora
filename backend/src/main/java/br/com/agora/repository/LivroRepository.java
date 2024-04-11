package br.com.agora.repository;

import br.com.agora.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
        
    Livro findByIsbn(String isbn);


    List<Livro> findByTituloContainingIgnoreCase(String termoPesquisa);
}
