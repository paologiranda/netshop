package it.netshop.test;

import java.util.List;

import it.netshop.ecommerce.local.GestioneLocal;
import it.netshop.ecommerce.local.dto.Comune;
import it.netshop.ecommerce.local.dto.Provincia;
import it.netshop.ecommerce.local.dto.Regione;

public class LocalTest {

	public static void main(String[] args) {
		
		GestioneLocal gl = new GestioneLocal();
		List<Regione> regioni = gl.getRegioni();
		
		for(Regione regione : regioni){
			System.out.println(regione.getId() + "  " +regione.getNome());
		}
		
		List<Provincia> province = gl.getProvince(1);
		
		for(Provincia provincia : province){
			System.out.println("Id provincia: "+provincia.getIdprovincia() + ", Provincia: " +provincia.getNomeprovincia() 
					+", ID regione"+provincia.getIdregione()+", Sigla: "+provincia.getSiglaprovincia());
		}
		
		List<Comune> comuni = gl.getComuni(1, 2);
		for(Comune comune : comuni){
			System.out.println("id comune: "+comune.getId() + ", Comune:" +comune.getNomecomune()
					+ " ID provincia "+comune.getIdprovincia() +", id regione: "+comune.getIdregione());
		}
		
		
	}

}
