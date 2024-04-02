package br.com.agora.controller;


import br.com.agora.dto.response.RetornarResumoPedidoResponse;
import br.com.agora.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.ParseException;

@RestController
@RequestMapping("/pedido")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @GetMapping("/obter/{id}")
    public ResponseEntity<RetornarResumoPedidoResponse> retornarResumoPedido(
            @PathVariable Long id) throws IOException, ParseException {
        RetornarResumoPedidoResponse  response = pedidoService.retornarPedido(id);
        return ResponseEntity.ok(response);  
    }
}
