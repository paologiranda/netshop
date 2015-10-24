package it.netshop.ecommerce.acquisto;

import it.netshop.ecommerce.acquisto.dto.ProdottoOrdinato;

import java.sql.SQLException;
import java.util.List;

public interface IDAOProdottiOrdinati {

	public int creaProdottiOrdinati(ProdottoOrdinato prodotto,int idOrdine)throws SQLException;
	public List<ProdottoOrdinato> readProdottiOrdinati(int idOrdine)throws SQLException;
	public int deleteProdottiOrdinati(int idOrdine) throws SQLException;
	
}
