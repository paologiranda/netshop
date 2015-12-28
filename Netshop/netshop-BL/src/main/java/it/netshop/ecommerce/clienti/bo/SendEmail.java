package it.netshop.ecommerce.clienti.bo;

import it.netshop.ecommerce.clienti.dao.DaoClienti;
import it.netshop.ecommerce.clienti.exception.ClienteInesistente;
import it.netshop.ecommerce.gestioneAppuntamenti.ErroreSistema;

import java.util.*;

import javax.mail.*;
import javax.mail.internet.*;

public class SendEmail {

 
	private static String USER_NAME = "paologiranda";  // GMail user name (just the part before "@gmail.com")
    private static String PASSWORD = "OldValley197"; // GMail password
    private static String RECIPIENT = "paologiranda@gmail.com";


    public static void main(String[] args) throws ErroreSistema, ClienteInesistente {
      
        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = { RECIPIENT }; // list of recipient email addresses
//        String[] to = {"paologiranda@gmail.com"};
        String subject = "Netshop ti dà il benvenuto"; 
        
	 
		 String body =  "Ciao </br>" + " Grazie per esserti registrato. Questo è il codice: ";
        
        sendFromGMail(from, pass, to, subject, body);
       
    }

    public static void sendFromGMail(String from, String pass, String[] to, String subject, String body){
       
    	
    	
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        
        Authenticator auth = new SMTPAuthenticator();
        Session session = Session.getInstance(props, auth);
        session.setDebug(true);
        MimeMessage message = new MimeMessage(session);

        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for( int i = 0; i < to.length; i++ ) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for( int i = 0; i < toAddress.length; i++) {
                message.addRecipient(Message.RecipientType.TO, toAddress[i]);
            }

            message.setSubject(subject);
            message.setText(body);
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        }
        catch (AddressException ae) {
            ae.printStackTrace();
        }
        catch (MessagingException me) {
            me.printStackTrace();
        }
    }
    
    public static String getCodConferma(String mail) throws ErroreSistema, ClienteInesistente{
    	  IGestioneClientiService boClienti = null;
    	  String result = null;
          try {
          	boClienti = new GestioneClienti(new DaoClienti("jdbc:oracle:thin:@//localhost:1521/XE"));      
            result = boClienti.getCodiceConferma(mail);
            return result;
          } 
          catch (ClassNotFoundException e) {
        	   e.printStackTrace();
          }
		return result;
          
		
	
    }
}