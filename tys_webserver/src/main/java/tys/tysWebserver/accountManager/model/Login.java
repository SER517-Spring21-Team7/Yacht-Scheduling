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
	@GeneratedValue(strategy=GenerationType.AUTO)
	@NotNull
	@Column(name = "userid")
	private long id;
	
	@Column(unique = true, name = "email")
	@NotNull
	private String email;
	
	@Column(name = "password")
	@NotNull
	private String password;
	
	public Login( String email, String password ) {
		super();
		this.email = email;
		this.password = password;
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

//	public Date getCreationDate() {
//		return creationDate;
//	}
//
//	public void setCreationDate(Date creationDate) {
//		this.creationDate = creationDate;
//	}
	
}
