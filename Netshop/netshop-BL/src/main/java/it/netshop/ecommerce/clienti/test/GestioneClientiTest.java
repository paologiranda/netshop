package it.netshop.ecommerce.clienti.test;

import it.netshop.ecommerce.clienti.bo.CategoriaCliente;
import it.netshop.ecommerce.clienti.bo.CategoriaVia;
import it.netshop.ecommerce.clienti.bo.Cliente;
import it.netshop.ecommerce.clienti.bo.GeneraMailConferma;
import it.netshop.ecommerce.clienti.bo.GestioneClienti;
import it.netshop.ecommerce.clienti.exception.CfGiaRegistrato;
import it.netshop.ecommerce.clienti.exception.ClienteGiaAttivato;
import it.netshop.ecommerce.clienti.exception.ClienteGiaRegistrato;
import it.netshop.ecommerce.clienti.exception.ClienteInesistente;
import it.netshop.ecommerce.clienti.exception.CodiceConfermaErrato;
import it.netshop.ecommerce.clienti.exception.DatabaseNonTrovato;
import it.netshop.ecommerce.clienti.exception.PivaGiaRegistrata;
import it.netshop.ecommerce.clienti.exception.TabellaNonTrovata;
import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;
import it.netshop.ecommerce.test.SpringTest;

import java.sql.SQLException;
import java.util.List;
import java.util.Random;

import org.junit.Assert;
import org.junit.Test;


public class GestioneClientiTest extends SpringTest<GestioneClienti> {
	GestioneClienti gest = getBean("clienti");
	Random rd = new Random();
	String piva = "" + rd.nextInt(23000);
	String emailAzienda="azienda@gmail.com";
	String emailPrivato="privato@gmail.com";
	
	 
	@Test
	public void testAggiungiAzienda() throws ClienteGiaRegistrato, ClienteInesistente, ClienteGiaAttivato, PivaGiaRegistrata, TabellaNonTrovata, DatabaseNonTrovato, ErroreSistema, CodiceConfermaErrato {

		Assert.assertTrue(gest.aggiungiCliente("pip1po srl", piva,
				CategoriaCliente.Azienda, "34015212", emailAzienda, "Italia", "Torino", "TO", 3, "B",
				CategoriaVia.largo, "Stretto", 10146, "69", "azienda") == 1);
		testAttivaCliente(emailAzienda);
		Assert.assertNotNull(testRitornoCodice(emailAzienda));
	}

	@Test
	public void testAggiungiPrivato() throws ClienteGiaRegistrato, ClienteInesistente, ClienteGiaAttivato, CfGiaRegistrato, TabellaNonTrovata, DatabaseNonTrovato, ErroreSistema, CodiceConfermaErrato {
		Random rd = new Random();
		String cf = "ALALA" + rd.nextInt(23000) + "BIZIO";


		Assert.assertTrue(gest.aggiungiCliente("Mario", "Rossi", cf,
				CategoriaCliente.Privato, "34015212",
				emailPrivato, "Italia",
				"Torino", "TO", 3, "B", CategoriaVia.largo, "Stretto", 10146,
				"69", "privato") == 1);
		testAttivaCliente(emailPrivato);
	}


	public void testAttivaCliente(String mail) throws ClienteInesistente, ClienteGiaAttivato, DatabaseNonTrovato, ErroreSistema, CodiceConfermaErrato {
		Assert.assertTrue(gest.controllaAttivazione(mail, GeneraMailConferma.getCodice())==1);
	}

	@Test
	public void testaLista() throws ClassNotFoundException, SQLException, TabellaNonTrovata, ErroreSistema {

		List<Cliente> clientiTrovati = gest.listaClienti();
		Assert.assertNotNull(clientiTrovati);
		Assert.assertTrue(clientiTrovati.size() > 0);
	
	}
	public String testRitornoCodice(String mail) throws ClienteInesistente, ErroreSistema{
		return gest.getCodiceConferma(mail);
	}

}
