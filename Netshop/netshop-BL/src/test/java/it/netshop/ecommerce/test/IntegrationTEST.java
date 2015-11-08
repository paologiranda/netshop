package it.netshop.ecommerce.test;

import java.sql.SQLException;

import it.netshop.ecommerce.integration.dao.DAOMagazzino;
import it.netshop.ecommerce.integration.dto.Categoria;
import it.netshop.ecommerce.integration.dto.Prodotto;
import it.netshop.ecommerce.integration.dto.SottoCategoria;
import it.netshop.ecommerce.integration.dto.Tipo;

import org.junit.Assert;
import org.junit.Test;

public class IntegrationTEST {
	DAOMagazzino dm ;
	Prodotto prodotto =  new Prodotto(Categoria.Elettronica, SottoCategoria.Domotica, Tipo.Prodotto, "CODIC", "PC-HP", "Computer Nuovo", false, 1000.2);
	
	@Test
	public void CreaProdotto() {
		int risposta = 0;
		try {
			dm = new DAOMagazzino();
			risposta = dm.createProdotto(prodotto);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		Assert.assertTrue(risposta>0);
	}
	
	@Test
	public void Giacenza() {
		long risposta = 0;
		try {
			dm = new DAOMagazzino();
			risposta = dm.restituisciGiacenza(new Prodotto(null,null,null,"SORV010",null,null,false,0));
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		Assert.assertTrue(risposta>0);
	}
	
	
	@Test
	public void ElimiaProdotto() {
		int risposta = 0;
		try {
			dm = new DAOMagazzino();
			risposta = dm.cancellaProdotto(prodotto.getCodice());
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		Assert.assertTrue(risposta>0);
	}

}
