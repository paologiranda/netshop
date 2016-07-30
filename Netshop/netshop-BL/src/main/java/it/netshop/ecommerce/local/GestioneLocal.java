package it.netshop.ecommerce.local;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import it.netshop.ecommerce.local.dao.DAOLocal;
import it.netshop.ecommerce.local.dao.IDAOLocal;
import it.netshop.ecommerce.local.dto.Comune;
import it.netshop.ecommerce.local.dto.Provincia;
import it.netshop.ecommerce.local.dto.Regione;
import it.netshop.ecommerce.local.dto.State;

public class GestioneLocal {

	public IDAOLocal daolocal;
	
	public GestioneLocal(){}
	
	public List<State> getStati(){
		List<State> stati = new ArrayList<State>();
		try {
			daolocal = new DAOLocal();
			stati = daolocal.leggiStati();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return stati;
	}
	
	public List<Regione> getRegioni(){
		List<Regione> regioni = new ArrayList<Regione>();
		try {
			daolocal = new DAOLocal();
			regioni = daolocal.leggiRegioni();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return regioni;
	}
	
	public List<Provincia> getProvince(int idRegione){
		
		List<Provincia> provincia = new ArrayList<Provincia>();
		
		try {
			daolocal = new DAOLocal();
			provincia = daolocal.leggiProvince(idRegione);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return provincia;
	}
	
	public List<Comune> getComuni(int idregione, int idprovincia){
		
		List<Comune> comuni = new ArrayList<Comune>();
		
		try {
			daolocal = new DAOLocal();
			comuni = daolocal.leggiComuni(idregione, idprovincia);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return comuni;
	}
		
}
