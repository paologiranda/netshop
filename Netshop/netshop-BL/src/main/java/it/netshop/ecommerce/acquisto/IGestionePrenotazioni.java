package it.netshop.ecommerce.acquisto;

import java.util.List;

import it.netshop.ecommerce.acquisto.dto.Prenotazione;
import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;



public interface IGestionePrenotazioni {
	
	public abstract int inseriscePrenotazione(Prenotazione prenotazione) throws ErroreSistema;
	
	public abstract Prenotazione getPrenotazione(int idPrenotazione) throws ErroreSistema;
	
	public abstract List<Prenotazione> getPrenotazioni(int codCliente) throws ErroreSistema;
	
	public abstract int eliminaPrenotazione(int idPrenotazione) throws ErroreSistema;
	
}
