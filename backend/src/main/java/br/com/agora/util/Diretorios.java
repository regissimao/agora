package br.com.agora.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Data
@Component
@PropertySource("classpath:diretorios.properties")
public class Diretorios {

    @Value("${path.capa}")
    private String pathCapa;

    @Value("${path.pdf}")
    private String pathPdfLivro;
}
