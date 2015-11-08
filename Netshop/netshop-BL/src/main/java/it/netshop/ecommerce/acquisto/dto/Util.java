package it.netshop.ecommerce.acquisto.dto;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class Util {
	
	public static String conversioneData(GregorianCalendar data){
		int giorno=((data.get(Calendar.DATE))); 
		int mese=((data.get(Calendar.MONTH)))+1;
		int year=((data.get(Calendar.YEAR)));
		String data_in_stringa=giorno+"-"+mese+"-"+year;
		return data_in_stringa;
	}
	
	public static String conversioneDataTime(GregorianCalendar data){
		String AM_PM_string;
		int am_pm=((data.get(Calendar.AM_PM)));
		int giorno=((data.get(Calendar.DATE))); 
		int mese=((data.get(Calendar.MONTH)))+1; //il mese parte da zero.
		int year=((data.get(Calendar.YEAR)));
		int ora=((data.get(Calendar.HOUR)));
		if (ora==0){
			ora=12;
		}
		int minuti=((data.get(Calendar.MINUTE)));		
		int secondi=((data.get(Calendar.SECOND)));
		if(am_pm==1)
			AM_PM_string="PM";
			else
				AM_PM_string="AM";				
		
		String data_in_stringa=giorno+"-"+mese+"-"+year+" "+ora+":"+minuti+":"+secondi+ " "+AM_PM_string;
		return data_in_stringa;
	}
}
