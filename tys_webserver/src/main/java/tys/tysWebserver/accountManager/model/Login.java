package tys.tysWebserver.accountManager.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name="userlogin")
public class Login {

	@Id
	@NotNull
	@Column(name = "userid")
	private int id;

	@Column(unique = true, name = "email")
	@NotNull
	private String email;
	
	@Column(name = "password")
	@NotNull
	private String password;
	
	@Column(name = "role")
	@NotNull
	private String role;
	
	public Login() {
		super();
	}

	public Login(int id, String email, String password, String role ) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.role = role;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

//	public Date getCreationDate() {
//		return creationDate;
//	}
//
//	public void setCreationDate(Date creationDate) {
//		this.creationDate = creationDate;
//	}
	
}
