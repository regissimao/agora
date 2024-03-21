package br.com.agora.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="tb_pagamento")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pagamento {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
    @Column(name = "status", nullable = false)
	private  boolean status;
	
    @Column(name = "tipo", nullable = false)
    private  boolean tipo;
    
    @Column(name = "data_pedido", nullable = false)
    private  Date dataPedido;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;
}
