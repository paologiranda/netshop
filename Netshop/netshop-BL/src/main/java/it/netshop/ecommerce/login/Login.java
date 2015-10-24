package it.netshop.ecommerce.login;

import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;

import java.sql.SQLException;

public class Login implements ILogin {

	@Override
	public Utente login(String mail, String pwd) throws LoginErrato,
			ErroreSistema, ClienteNonattivo {
		DaoLogin db = null;
		Utente ut = null;
		try {
			db = new DaoLogin();
			try {
				ut = db.searchCliente(mail, pwd);
				ut.setToken(Generatoretoken.generatoken("U"));
				ut.setNome(db.searchDataForPrivati(mail));
			} catch (LoginErrato e) {
				try {
					ut = db.searchAdmin(mail, pwd);
					ut.setToken(Generatoretoken.generatoken("A"));
					ut.setNome(db.searchDataForAdmin(mail));
				} catch (LoginErrato e1) {
					throw new LoginErrato();
				}
			}
		} catch (SQLException e1) {
			throw new ErroreSistema(
					"Errore in fase di inserimento appuntamenti", e1);
		} catch (ClassNotFoundException e2) {
			throw new ErroreSistema("Driver del database non presente", e2);
		}
		return ut;
	}

}
