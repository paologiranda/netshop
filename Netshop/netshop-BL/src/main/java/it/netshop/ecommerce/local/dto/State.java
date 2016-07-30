package it.netshop.ecommerce.local.dto;

public class State {

		private String nomeStato;
		
		
		public State(){};
		
		
		public State(String nomeStato) {
			this.nomeStato = nomeStato;
		}
		
		
		public String nomeStato() {
			return nomeStato;
		}

		public void setnomeStato(String nomeStato) {
			this.nomeStato = nomeStato;
		}
}
