package tys.tysWebserver.memberManager.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "memberdetails")
public class MemberModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "memberid")
	private int memberId;
	@Column(name = "email")
	private String email;
	@Column(name = "firstname")
	private String firstname;
	@Column(name = "lastname")
	private String lastname;
	@Column(name = "password")
	private String password;
	@Column(name = "password2")
	private String password2;
	@Column(name = "startdate")
	private Date startdate;
	@Column(name = "enddate")
	private Date enddate;
	@Column(name = "premiumshare")
	private String premiumshare;
	@Column(name = "standardshare")
	private String standardshare;
	@Column(name = "freebookings")
	private String freebookings;
	@Column(name = "schedulercolor")
	private String schedulercolor;
	@Column(name = "access")
	private String access;
	@Lob
	@Column (name = "userimage")
	private String image;

	@Override
	public String toString() {
		return "memberdetails [memberid=" + memberId + ", email=" + email + ", firstname=" + firstname + ", lastname="
				+ lastname + ", password=" + password + ", password2=" + password2 + ", startdate=" + startdate
				+ ", enddate=" + enddate + ", premiumshare=" + premiumshare + ", standardshare=" + standardshare
				+ ",freebookings=" + freebookings + ",schedulercolor=" + schedulercolor + ",access= " + access + ",image="+image+ "]";
	}
	public MemberModel() {
		super();
	}
	
	
	public MemberModel(int memberId, String email, String firstname, String lastname, String password, String password2,
			Date startdate, Date enddate, String premiumshare, String standardshare, String freebookings,
			String schedulercolor, String access, String image) {
		super();
		this.memberId = memberId;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.password2 = password2;
		this.startdate = startdate;
		this.enddate = enddate;
		this.premiumshare = premiumshare;
		this.standardshare = standardshare;
		this.freebookings = freebookings;
		this.schedulercolor = schedulercolor;
		this.access = access;
		this.image = image;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPassword2() {
		return password2;
	}
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
	public Date getStartdate() {
		return startdate;
	}
	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}
	public Date getEnddate() {
		return enddate;
	}
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	public String getPremiumshare() {
		return premiumshare;
	}
	public void setPremiumshare(String premiumshare) {
		this.premiumshare = premiumshare;
	}
	public String getStandardshare() {
		return standardshare;
	}
	public void setStandardshare(String standardshare) {
		this.standardshare = standardshare;
	}
	public String getFreebookings() {
		return freebookings;
	}
	public void setFreebookings(String freebookings) {
		this.freebookings = freebookings;
	}
	public String getSchedulercolor() {
		return schedulercolor;
	}
	public void setSchedulercolor(String schedulercolor) {
		this.schedulercolor = schedulercolor;
	}
	public String getAccess() {
		return access;
	}
	public void setAccess(String access) {
		this.access = access;
	}
	
	
}
