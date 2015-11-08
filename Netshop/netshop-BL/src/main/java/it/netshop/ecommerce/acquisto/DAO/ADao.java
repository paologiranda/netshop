package it.netshop.ecommerce.acquisto.DAO;

import it.netshop.db.ConnessioneDB;
import it.netshop.db.DbUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public abstract class ADao {

	public ADao(){
		super();
	}

	protected int eseguiAggiornamento(String sqlString) throws SQLException, ClassNotFoundException {

		Connection connessione = ConnessioneDB.getConnection();
		Statement statement =connessione.createStatement();
		
		int result = statement.executeUpdate(sqlString);
		DbUtil.close(connessione, statement);
		
		return result;
	}
	
	protected List<Object> eseguiQuery(String sqlString) throws SQLException{		
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		ResultSet resultset = statement.executeQuery(sqlString);
		List<Object> lista= rsToLista(resultset);
				
		DbUtil.close(connessione, statement);
		return lista;
	}
	
	protected abstract List<Object> rsToLista(ResultSet rs) throws SQLException;
}