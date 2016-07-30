package it.netshop.ecommerce.local.dao;

import it.netshop.db.ConnessioneDB;
import it.netshop.db.DbUtil;
import it.netshop.ecommerce.local.dto.Comune;
import it.netshop.ecommerce.local.dto.Provincia;
import it.netshop.ecommerce.local.dto.Regione;
import it.netshop.ecommerce.local.dto.State;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.NewsAddress;

public class DAOLocal implements IDAOLocal {
	private static int MAX_REGIONI = 21;
	private static String SQLREGIONI = "SELECT * FROM REGIONI WHERE IDREGIONE<" + MAX_REGIONI;

	@Override
	public List<Regione> leggiRegioni() throws SQLException {

		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();

		List<Regione> regioni = new ArrayList<Regione>();

		ResultSet resultSet = statement.executeQuery(SQLREGIONI);

		while (resultSet.next()) {
			Regione regione = new Regione();
			regione.setId(resultSet.getInt("IDREGIONE"));
			regione.setNome(resultSet.getString("NOMEREGIONE"));
			regioni.add(regione);
		}
		DbUtil.close(connessione, statement, resultSet);
		return regioni;
	}

	@Override
	public List<Provincia> leggiProvince(int idRegione) throws SQLException {
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		String sqlprovince = "SELECT * FROM PROVINCE WHERE IDREGIONE="
				+ idRegione;
		ResultSet resultSet = statement.executeQuery(sqlprovince);
		List<Provincia> province = new ArrayList<Provincia>();

		while (resultSet.next()) {
			Provincia provincia = new Provincia();
			provincia.setIdprovincia(resultSet.getInt("IDPROVINCIA"));
			provincia.setIdregione(resultSet.getInt("IDREGIONE"));
			provincia.setNomeprovincia(resultSet.getString("NOMEPROVINCIA"));
			provincia.setSiglaprovincia(resultSet.getString("SIGLAPROVINCIA"));
			province.add(provincia);
		}
		DbUtil.close(connessione, statement, resultSet);
		return province;
	}

	@Override
	public List<Comune> leggiComuni(int idregione, int idprovincia)
			throws SQLException {
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		String sqlcomuni = "SELECT * FROM COMUNI where IDREGIONE=" + idregione
				+ " AND IDPROVINCIA=" + idprovincia;

		ResultSet resultSet = statement.executeQuery(sqlcomuni);
		List<Comune> comuni = new ArrayList<Comune>();

		while (resultSet.next()) {
			Comune comune = new Comune();
			comune.setIdregione(resultSet.getInt("IDREGIONE"));
			comune.setId(resultSet.getInt("ID"));
			comune.setIdprovincia(resultSet.getInt("IDPROVINCIA"));
			comune.setNomecomune(resultSet.getString("NOME"));
			comune.setCatasto(resultSet.getString("CATASTO"));
			comuni.add(comune);
		}
		DbUtil.close(connessione, statement, resultSet);
		return comuni;
	}

	@Override
	public List<State> leggiStati() throws SQLException {
		Connection connessione = ConnessioneDB.getConnection();
		Statement statement = connessione.createStatement();
		
		String sqlcomuni = "SELECT * FROM STATE";
		
		ResultSet resultSet = statement.executeQuery(sqlcomuni);
		List<State> stati = new ArrayList<State>();
		while (resultSet.next()) {
			State state = new State();
			state.setnomeStato(resultSet.getString("LASTNAME"));
			stati.add(state);
		}
		DbUtil.close(connessione, statement, resultSet);
		return stati;
	}

}
