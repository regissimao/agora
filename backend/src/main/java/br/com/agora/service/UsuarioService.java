package br.com.agora.service;

import org.springframework.stereotype.Service;

import br.com.agora.entity.Usuario;
import br.com.agora.exception.BadRequestException;
import br.com.agora.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    
    public Usuario logar(String email, String senha) {
    	
	 	Usuario usuario = usuarioRepository.findByEmail(email);
	 	
	 	if ((usuario == null) || (!senha.equals(usuario.getSenha()))) {
		    throw new BadRequestException("Email e senha inválidos.");
		}
	 	
	 	return usuario;
	}
}
