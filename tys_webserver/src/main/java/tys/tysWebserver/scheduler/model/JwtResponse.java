package tys.tysWebserver.scheduler.model;

import java.io.Serializable;

public class JwtResponse implements Serializable
{
	

	private static final long serialVersionUID = 1L;
	private final String jwttoken;
	private final String role;

	public JwtResponse(String jwttoken, String role) {
		this.jwttoken = jwttoken;
		this.role = role;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public String getRole() {
		return this.role;
	}
}
