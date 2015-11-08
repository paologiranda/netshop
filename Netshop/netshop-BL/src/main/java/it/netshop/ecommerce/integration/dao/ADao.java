package it.netshop.ecommerce.integration.dao;


import it.netshop.db.ConnessioneDB;
import it.netshop.db.DbUtil;
import it.netshop.ecommerce.integration.dto.Prodotto;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public abstract class ADao {

	public ADao() {
		super();
	}
	
	protected int eseguiAggiornamento(String sqlString) throws SQLException, ClassNotFoundException {
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		
		int result = statement.executeUpdate(sqlString);
		DbUtil.close(connessione, statement);
		return result;
	}
	
	protected List<Prodotto> eseguiQuery(String sqlString) throws SQLException{	
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		ResultSet resultset = statement.executeQuery(sqlString);
		
		List<Prodotto> lista= rsToLista(resultset);
		DbUtil.close(connessione, statement,resultset);
		
		return lista;
	}
	
	protected long retituisceGiacenza(String sqlString) throws SQLException{
		long giacenza = 0;
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		ResultSet resulset = statement.executeQuery(sqlString);

		if (resulset.next())
			giacenza = (long) resulset.getLong(1);

		DbUtil.close(connessione, statement,resulset);
		
		return giacenza;
	}
	
	protected abstract List<Prodotto> rsToLista(ResultSet rs) throws SQLException;
	
}