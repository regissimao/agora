package br.com.agora.exception;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Problema {
    private Integer status;
    private LocalDateTime dataHora;
    private String titulo;
    private List<Campo> campos;
}
