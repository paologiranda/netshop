package it.netshop.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DbUtil {
	
	public static void close(Connection connessione){
		if(connessione != null){
			try{
				connessione.close();
			} catch(SQLException e){
				//Logger.getLogger(DbUtil.class.getName()).log(Level.SEVERE,null,e);
				System.out.println("ERRORE: Nella Chiusura della Connessione - "+e.getMessage());
			}
		}
	}
	
	public static void close(Statement statement){
		if(statement != null){
			try {
				statement.close();
			} catch (SQLException e) {
				System.out.println("ERRORE: Nella Chiusura dello Statement - "+e.getMessage());
			}
		}
	}
	
	public static void close(ResultSet resultSet){
		if(resultSet != null){
			try{
				resultSet.close();
			}catch(SQLException e){
				System.out.println("ERRORE: Nella Chiusura del ResulSet - "+e.getMessage());
			}
		}
	}
	
	public static void close(Connection connessione, Statement statement){
		close(connessione);
		close(statement);
	}
	
	public static void close(Connection connessione, Statement statement, ResultSet resultSet){
		close(connessione);
		close(statement);
		close(resultSet);
	}
}
