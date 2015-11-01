package it.netshop.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConnessioneDB {
	
	private static ConnessioneDB instance = new ConnessioneDB();
	public static final String DB_URL = "jdbc:oracle:thin:@//localhost:1521/XE";
	public static final String DB_USER = "corso";
	public static final String DB_PASSWORD = "corso";
	public static final String DB_DRIVER = "oracle.jdbc.OracleDriver";
	
	private ConnessioneDB(){
		try {
			Class.forName(DB_DRIVER);
		} catch (ClassNotFoundException e) {
			Logger.getLogger(ConnessioneDB.class.getName()).log(Level.SEVERE,null,e);
//			System.out.println("ERRORE: "+e.getMessage());
//			e.printStackTrace();
		}
	}
	
	private Connection createConnection(){
		Connection connessione = null;
		
		try {
			connessione = DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWORD);
		} catch (SQLException e) {
			System.out.println("ERRORE: Impossibile connettersi al DB.");
		}
		return connessione;
	}
	
	public static Connection getConnection(){
		return instance.createConnection();
	}
	
}
