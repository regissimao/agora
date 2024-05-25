package br.com.agora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.com.agora.dto.UsuarioDTO;
import br.com.agora.entity.Usuario;
import br.com.agora.service.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;

	@PostMapping(path="/logar")
	public UsuarioDTO logar(@RequestBody Usuario usuario) {
		
        Usuario user = usuarioService.logar(usuario.getEmail(), usuario.getSenha());
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(user.getId());
        usuarioDTO.setNome(user.getNome());
        usuarioDTO.setEmail(user.getEmail());
        usuarioDTO.setCpfCpnj(user.getCpfCpnj());

        return usuarioDTO;
	}      
}
