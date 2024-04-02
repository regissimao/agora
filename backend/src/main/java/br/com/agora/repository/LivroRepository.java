package br.com.agora.repository;

import br.com.agora.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    Livro findByIsbn(String isbn);

}
