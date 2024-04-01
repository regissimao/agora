package br.com.agora.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Campo {
    private String nome;
    private String message;
    public Campo(String message) {
        this.message = message;
    }
}
