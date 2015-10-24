package it.netshop.ecommerce.acquisto;

import it.netshop.ecommerce.acquisto.dto.ProdottoOrdinato;
import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;
import it.netshop.ecommerce.integration.dto.Prodotto;

import java.util.ArrayList;


public interface IGestioneOrdini {

	public double acquisto(ArrayList<ProdottoOrdinato> prodottiOrdinati, String codUser) throws ErroreSistema, ClassNotFoundException;
	
	public ArrayList<ProdottoOrdinato> convertiProdotti(ArrayList<Prodotto> prodotti);
			
}
