package it.netshop.ecommerce.login;

import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;

public interface ILogin {
Utente login(String mail, String pwd) throws LoginErrato, ErroreSistema, ClienteNonattivo;
}
 