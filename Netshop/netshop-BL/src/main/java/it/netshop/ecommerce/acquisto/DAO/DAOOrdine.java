package it.netshop.ecommerce.acquisto.DAO;

import it.netshop.ecommerce.acquisto.IDAOOrdine;
import it.netshop.ecommerce.acquisto.dto.Ordine;
import it.netshop.ecommerce.acquisto.dto.StatoOrdine;
import it.netshop.ecommerce.acquisto.dto.Util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;


public class DAOOrdine extends ADao implements IDAOOrdine {
	
	String url="jdbc:oracle:thin:@//localhost:1521/XE";
	
	public DAOOrdine() throws ClassNotFoundException {
		super();
	}

	@Override
	public int creaOrdine(Ordine ordine) throws SQLException {

		String dataOrdineString = Util.conversioneDataTime(ordine.getDataOrdine());
		String dataArrivoString = Util.conversioneData(ordine.getDataArrivo());

		String sqlprova="INSERT INTO ORDINI (DATAORDINE,STATO,CODCLIENTE,DATAARRIVO) values (to_date('"+dataOrdineString+"', 'dd-mm-yyyy HH:mi:ss PM'),'"+ordine.getStato()+"',"+ordine.getIdCliente()+",to_date('"+dataArrivoString+"', 'dd-mm-yyyy '))";
		System.out.println(sqlprova);
		try {
			return eseguiAggiornamento(sqlprova);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	@Override
	public int getIdOrdineDb(int idcliente) throws SQLException {
		
		int idordine =15;
		Connection connessione = DriverManager.getConnection(url,"corso","corso");
		Statement statement = connessione.createStatement();

		String sql="select idordine "
				+ "from ordini "
				+ "where idordine=(select max(idordine) "
				+ "from ordini where codcliente="+idcliente+")";
		ResultSet resultset = statement.executeQuery(sql);	

		//System.out.println(sql);
		while (resultset.next())
			idordine = resultset.getInt("idordine");
		//System.out.println(idordine);
		connessione.close();
		return idordine;


	}
	
	@Override
	public List<Object> leggiOrdine(int idCliente) throws SQLException{
		List<Object> result = new ArrayList<Object>();
		String sql = "select * from ORDINI WHERE CODCLIENTE='"+idCliente+"'";
		result = eseguiQuery(sql);
		return result;
	}

	@Override
	public int updateStatoOrdine(StatoOrdine stato, int idOrdine) throws SQLException{
		String sqlString = "update ORDINI set "
				+ "STATO='" + stato.toString()+ "' "
				+ "where IDORDINE=" + idOrdine;
		try {
			return eseguiAggiornamento(sqlString);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int deleteOrdine(int idOrdine) throws SQLException{
		try {
			return eseguiAggiornamento("DELETE ORDINI WHERE IDORDINE='"+idOrdine+"'");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	@Override
	protected List<Object> rsToLista(ResultSet resultset) throws SQLException {
		List<Object> result= new ArrayList<Object>();
		while (resultset.next()) {
			int idCliente= resultset.getInt("codcliente");
			Calendar gc = new GregorianCalendar();
			gc.setTime(resultset.getDate("dataordine"));
			Calendar dataOrdine= gc;
			StatoOrdine stato = StatoOrdine.valueOf(resultset.getString("stato"));
			result.add(new Ordine(idCliente,dataOrdine,stato));
		}
		
		return result;
	}
	
	/**
	 * RESTITUISCE LA LISTA DI TUTTI GLI ORDINI FATTI DAI CLIENTI
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<Ordine> letturaOrdini() throws SQLException{
		
		List<Ordine> ordini = new ArrayList<Ordine>();
		String sqlString ="select * from ORDINI";
		
		Connection connessione = DriverManager.getConnection(url,"corso","corso");
		Statement statement = connessione.createStatement();
		
		ResultSet resultset = statement.executeQuery(sqlString );
		while(resultset.next()){
			int idCliente = resultset.getInt("CODCLIENTE");
			Calendar gc = new GregorianCalendar();
			gc.setTime(resultset.getDate("DATAORDINE"));
			Calendar dataOrdine= gc;
			StatoOrdine stato = StatoOrdine.valueOf(resultset.getString("STATO"));
			
			ordini.add(new Ordine(idCliente, dataOrdine, stato));
		}

		connessione.close();

		return ordini;
	}
	
}