package it.netshop.ecommerce.local.dao;

import java.sql.SQLException;
import java.util.List;

import it.netshop.ecommerce.local.dto.Comune;
import it.netshop.ecommerce.local.dto.Provincia;
import it.netshop.ecommerce.local.dto.Regione;
import it.netshop.ecommerce.local.dto.State;

public interface IDAOLocal {
	
	public List<State> leggiStati() throws SQLException;
	
	public List<Regione> leggiRegioni() throws SQLException;
	
	public List<Provincia> leggiProvince(int idRegione) throws SQLException;
	
	public List<Comune> leggiComuni(int idregione, int idprovincia) throws SQLException;
	
}
