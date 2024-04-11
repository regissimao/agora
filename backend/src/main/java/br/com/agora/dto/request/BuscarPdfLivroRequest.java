package br.com.agora.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BuscarPdfLivroRequest {

    @NotBlank(message = "ISBN deve ser informado. Você é informou: ${validatedValue}")
    @Size(min = 13, max = 13, message = "ISBN deve ter {max} caracteres.")
    private String isbn;    

    
}
