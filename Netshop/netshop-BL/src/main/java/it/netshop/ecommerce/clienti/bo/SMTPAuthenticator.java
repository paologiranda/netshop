package it.netshop.ecommerce.clienti.bo;

import javax.mail.PasswordAuthentication;

public class SMTPAuthenticator extends javax.mail.Authenticator {
	
	String email = "paologiranda@gmail.com",
            password = "OldValley1987";
   
	public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(email, password);
    }
}
