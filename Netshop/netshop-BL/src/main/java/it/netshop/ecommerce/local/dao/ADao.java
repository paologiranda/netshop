package it.netshop.ecommerce.local.dao;

//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.List;

public abstract class ADao {
	protected String url="jdbc:oracle:thin:@//localhost:1521/XE";

	public ADao() throws ClassNotFoundException {
		super();
		Class.forName("oracle.jdbc.OracleDriver");
	}

//	protected int eseguiAggiornamento(String sqlString) throws SQLException, ClassNotFoundException {
//
//		Connection connessione = DriverManager.getConnection(url,"corso","corso");
//		Statement statement = connessione.createStatement();
//		int result = statement.executeUpdate(sqlString);
//		connessione.close();
//		return result;
//	}
//	protected List<Object> eseguiQuery(String sqlString) throws SQLException{		
//		Connection connessione = DriverManager.getConnection(url,"corso","corso");
//		Statement statement = connessione.createStatement();
//		ResultSet resultset = statement.executeQuery(sqlString);
//		List<Object> lista= rsToLista(resultset);
//		connessione.close();
//
//		return lista;
//
//	}
//	protected abstract List<Object> rsToLista(ResultSet rs) throws SQLException;
}
