package it.netshop.ecommerce.acquisto.DAO;

import it.netshop.ecommerce.acquisto.IDAOPrenotazioni;
import it.netshop.ecommerce.acquisto.dto.Prenotazione;
import it.netshop.ecommerce.acquisto.dto.Util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DAOPrenotazioni extends ADao implements IDAOPrenotazioni {

	public DAOPrenotazioni() throws ClassNotFoundException{
		super();
	}

	@Override
	public int inseriscePrenotazione(Prenotazione prenotazione) throws SQLException{
		String dataPrenotazione = Util.conversioneData(prenotazione.getDataPrenotazione());
		String dataArrivo = Util.conversioneData(prenotazione.getDataArrivo());
		String sqlString = "insert into prenotazioni (codprodotto,codcliente,qta,dataprenotazione,dataarrivo) values('" + prenotazione.getCodProdotto() + "'," + 
						+prenotazione.getCodcliente() +","+ prenotazione.getQta() + "," + "to_date('"+dataPrenotazione+"','dd-MM-yyyy')," + "to_date('"+dataArrivo+"','dd-MM-yyyy'))"; 
		System.out.println(sqlString);
		try {
			return  eseguiAggiornamento(sqlString);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	@Override
	public Prenotazione prendiPrenotazione(int idPrenotazione) throws SQLException {
		Prenotazione prenotazione = null;
		String sqlString ="select * from prenotazioni where idprenotazione="+idPrenotazione;
		
		List<Object> result = eseguiQuery(sqlString);
		
		if(result!=null){
			prenotazione = (Prenotazione) result.get(0);
		}
		return prenotazione;
	}
	
	@Override
	public List<Object> prendiPrenotazioni(int codCliente) throws SQLException {
		List<Object> result = new ArrayList<Object>();
		String sqlString ="select * from Prenotazioni where codcliente ="+codCliente;
		result = eseguiQuery(sqlString);
		return result;
	}

	@Override
	protected List<Object> rsToLista(ResultSet resultset) throws SQLException {
		
		List<Object> result= new ArrayList<Object>();
		while(resultset.next()){
			Prenotazione pren = new Prenotazione(resultset.getString("CODPRODOTTO"),resultset.getInt("CODCLIENTE"), resultset.getInt("QTA"));
			pren.setCodPrenotazione(resultset.getInt("IDPRENOTAZIONE"));
			result.add(pren);
		}
		return result;
	}
	
	@Override
	public int deletePrenotazione(int idprenotazione) throws SQLException {
		String sqlString ="DELETE prenotazioni WHERE idprenotazione="+idprenotazione;
		System.out.println(sqlString);
		
		try {
			return eseguiAggiornamento(sqlString);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return -1;
		
	}
	
}
