package br.com.agora.controller;


import br.com.agora.dto.PedidoDTO;
import br.com.agora.dto.request.CriarPedidoRequest;
import br.com.agora.dto.response.RetornarResumoPedidoResponse;
import br.com.agora.entity.Pedido;
import br.com.agora.entity.Usuario;
import br.com.agora.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/criar")
    public ResponseEntity<PedidoDTO> criarPedido( @RequestBody CriarPedidoRequest request) throws BadRequestException {
        PedidoDTO novoPedido = pedidoService.criarPedido(request.getIsbn(), request.getUsuario());
        return ResponseEntity.ok(novoPedido);
    }
}