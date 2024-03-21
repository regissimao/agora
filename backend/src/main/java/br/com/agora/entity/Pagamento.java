package br.com.agora.entity;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
@Table(name="tb_pagamento")
public class Pagamento {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private  boolean status;
	
    private  boolean tipo;

    private  Date dataPedido;

	private Pagamento() {};

}
