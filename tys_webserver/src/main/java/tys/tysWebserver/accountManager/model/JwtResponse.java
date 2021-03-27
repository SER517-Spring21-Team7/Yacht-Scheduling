package tys.tysWebserver.accountManager.model;

import java.io.Serializable;

public class JwtResponse implements Serializable
{
	

	private static final long serialVersionUID = 1L;
	private final String jwttoken;
	private final String role;
	private final Integer userId;

	public JwtResponse(String jwttoken, String role, Integer id) {
		this.jwttoken = jwttoken;
		this.role = role;
		this.userId = id;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public String getRole() {
		return this.role;
	}
	
	public Integer getId() {
		return this.userId;
	}
}
