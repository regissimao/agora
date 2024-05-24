package br.com.agora;

import br.com.agora.entity.Usuario;
import br.com.agora.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class DatabaseSeeder {

    private static final Logger log = LogManager.getLogger();


    private final UsuarioRepository usuarioRepository;

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            Optional<Usuario> existingUser = Optional.ofNullable(usuarioRepository.findByEmail("usuario@example.com"));
            if (existingUser.isEmpty()) {
                log.info("Criando usuário de teste no banco de dados");
                Usuario testUser = new Usuario();
                testUser.setNome("Test Usuário");
                testUser.setCpfCpnj("000.000.000-00");
                testUser.setDataNascimento(LocalDate.of(2000, 1, 1));
                testUser.setEmail("usuario@example.com");
                testUser.setSenha("senha123");

                usuarioRepository.save(testUser);
                log.info(String.format("Usuário de teste criado email: %s senha: %s", testUser.getEmail(), testUser.getSenha()));
            }
        };
    }
}
