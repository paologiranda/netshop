package it.netshop.rest;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import it.netshop.ecommerce.acquisto.GestioneOrdini;
import it.netshop.ecommerce.acquisto.IDAOOrdine;
import it.netshop.ecommerce.acquisto.DAO.DAOOrdine;
import it.netshop.ecommerce.acquisto.DAO.DAOProdottiOrdinati;
import it.netshop.ecommerce.acquisto.dto.Ordine;
import it.netshop.ecommerce.acquisto.dto.ProdottoOrdinato;
import it.netshop.ecommerce.clienti.bo.ClienteNome;
import it.netshop.ecommerce.clienti.dao.DaoClienti;
import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;
import it.netshop.ecommerce.integration.MagazzinoMock;
import it.netshop.ecommerce.integration.dao.DAOMagazzino;
import it.netshop.ecommerce.integration.dao.IDAOMagazzino;
import it.netshop.ecommerce.integration.dto.Prodotto;
import it.netshop.ecommerce.integration.exception.ProdottoInesistente;




import it.netshop.ecommerce.login.Utente;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import com.google.gson.Gson;


@Path("/ordini")
public class ServiziOrdini {
	@Context
	HttpServletRequest request;
	IDAOMagazzino mg = null;
	private String url="jdbc:oracle:thin:@//localhost:1521/XE";

	
	
	@Path("/inserisciCarrello")
	@GET
	@Produces("application/json")
	public String inserisciCarrello(@QueryParam("codProd") String codProd,
		@QueryParam("qta") String qta) throws ProdottoInesistente {
//		MagazzinoMock mag=new MagazzinoMock();
		try {
			mg = new DAOMagazzino();
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Gson gson = new Gson();
		String ris = null;
		Prodotto prod=null;
		ProdottoOrdinato po = null;
		boolean trovato = false;
		ArrayList<ProdottoOrdinato> carrello=(ArrayList<ProdottoOrdinato>) request.getSession().getAttribute("carrello");
		if ( carrello == null ){
			carrello=new ArrayList<ProdottoOrdinato>();
//			Gson gson = new Gson();
//			result = gson.toJson(carrello);
//			System.out.println(result);
//			return result;
		}
		
		for(int i = 0; i<carrello.size() && trovato == false ; i++ ){
			if(carrello.get(i).getCodiceProdotto().equalsIgnoreCase(codProd)){
				int qtatotale = carrello.get(i).getQtaOrdinata()+Integer.valueOf(qta);
				carrello.get(i).setQtaOrdinata(qtatotale);
				trovato = true;
			}
		}
		
		if( trovato == false ){
			try {
				prod = mg.readProdotto(codProd);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (prod!=null){

				po=new ProdottoOrdinato(codProd, Integer.parseInt(qta), 0, prod.getPrezzo(), 21);
//				po=new ProdottoOrdinato(codProd, Integer.parseInt(qta), 0, prod.getPrezzo(), 21,prod.getNome());
				po.setNomeProdotto(prod.getNome());
				carrello.add(po);
				ris = gson.toJson(po);
			}
		}
		
		request.getSession().setAttribute("carrello", carrello);
		System.out.println(ris);
		return "[" + ris + "]";
	}
	
	@GET
	@Path("/eliminaProdottoCarrello")
	@Produces("application/json")
	public void eliminaProdottoCarrello(@QueryParam("codProd")String codProd){
		
		ArrayList<ProdottoOrdinato> carrello=(ArrayList<ProdottoOrdinato>) request.getSession().getAttribute("carrello");
		ProdottoOrdinato pe = null;
		int trovato = -1;
		
		for(int i = 0 ; i < carrello.size() && trovato==-1; i++ ){
			if(carrello.get(i).getCodiceProdotto().equalsIgnoreCase(codProd))
				trovato = i;
			
		}
		
		if(trovato != -1)
			carrello.remove(trovato);
		
		if(carrello.isEmpty()){
			request.getSession().removeAttribute("carrello");
		} else{
			request.getSession().setAttribute("carrello", carrello);
		}
	}
	
	@Path("/visualizzaCarrello")
	@GET
	@Produces("application/json")
	public String visualizzaCarrello(@QueryParam ("codCliente") String codCliente){
		
		ArrayList<ProdottoOrdinato> carrello=(ArrayList<ProdottoOrdinato>) request.getSession().getAttribute("carrello");
		Gson gs=new Gson();
		String result=gs.toJson(carrello);
		return result;
	}
	
	
	@Path("/descrizione")
	@GET
	@Produces("application/json")
	public String descrizione(@QueryParam("codProd") String codProd){
		
		Prodotto prod = null;
		Gson gs=new Gson();
		MagazzinoMock mg=new MagazzinoMock();
		try {
			prod=mg.searchProdotto(codProd);
		} catch (ProdottoInesistente e) {
			e.printStackTrace();
		}
		return gs.toJson(prod);
	}
	
	@Path("/confermaOrdine")
	@GET
	@Produces("application/json")
	public String confermaOrdine() throws ClassNotFoundException{
		MagazzinoMock mg=new MagazzinoMock();
		ArrayList<ProdottoOrdinato> prodottiDaOrdinare = (ArrayList<ProdottoOrdinato>) request.getSession().getAttribute("carrello");
		
		GestioneOrdini go = new GestioneOrdini();
		Utente utente = (Utente) request.getSession().getAttribute("utente");
		
		String codUser = utente.getCodUtente();	// cliente provvisorio
		double importo=0;
		try {
			importo = go.acquisto(prodottiDaOrdinare, codUser);
			request.getSession().removeAttribute("carrello");
		} catch (ErroreSistema e) {
			e.printStackTrace();
		}
		Gson gs=new Gson();
		System.out.println(gs);
		return gs.toJson(importo);
	}
	
	
	/**
	 * Lista di tutti gli acquisti fatti da un cliente
	 * @param codCliente
	 * @return
	 * @throws ClassNotFoundException
	 */
	@Path("/acquistiCliente")
	@GET
	@Produces("application/json")
	public String acquistiCliente(@QueryParam ("codCliente") String codCliente) throws ClassNotFoundException{
		
		IDAOOrdine daoodine = new DAOOrdine();
		int codiceCliente = Integer.valueOf(codCliente);
		List<Object> risposta = new LinkedList<Object>();
		
		
		ArrayList<Ordine> listaOrdini = new ArrayList<Ordine>();
		
		try {
			ArrayList<Object>listaTemporane = (ArrayList<Object>) daoodine.leggiOrdine(codiceCliente);
			 
			for(Object ordine : listaTemporane){
				 listaOrdini.add((Ordine)ordine);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		ClienteNome cliente =  new ClienteNome();
		DaoClienti daoClienti =  new DaoClienti(url);
		
		try {
			cliente = daoClienti.nomeCliente(Integer.parseInt(codCliente));
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if(cliente!=null && listaOrdini!=null){
			risposta.add(cliente);
			risposta.add(listaOrdini);
		}
		
		Gson gs = new Gson();
		System.out.println(gs);
		//return gs.toJson(listaOrdini);
		return gs.toJson(risposta);
	}
	
	
	/**
	 * lista di tutti i clienti
	 * @param codCliente
	 * @return
	 * @throws ClassNotFoundException
	 */
	@Path("/acquisti")
	@GET
	@Produces("application/json")
	public String acquisti() throws ClassNotFoundException{
		
		IDAOOrdine daoodine = new DAOOrdine();
		//int codiceCliente = Integer.valueOf(codCliente);
		
		ArrayList<Ordine> listaOrdini = new ArrayList<Ordine>();
		
		try {
			listaOrdini = (ArrayList<Ordine>) daoodine.letturaOrdini();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Gson gs = new Gson();
		System.out.println(gs);
		return gs.toJson(listaOrdini);

	}
}
