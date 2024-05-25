package br.com.agora.repository;

import br.com.agora.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
        
    Livro findByIsbn(String isbn);


    List<Livro> findByTituloContainingIgnoreCase(String termoPesquisa);
    

    @Query(value = "SELECT livro.id, livro.arquivo_digital, livro.autor, livro.capa_livro, livro.titulo, livro.categoria, livro.data_publicacao, livro.editora, livro.idioma, livro.numero_pagina, livro.peso_fisico, livro.quantidade_estoque, livro.sinopse, livro.tipo_livro, livro.isbn, livro.preco_digital FROM tb_livro livro INNER JOIN tb_pedido lu ON livro.id = lu.livro_id WHERE lu.usuario_id = ?1", nativeQuery = true)
    List<Livro> searchMyBooks(int usuarioId);
}
