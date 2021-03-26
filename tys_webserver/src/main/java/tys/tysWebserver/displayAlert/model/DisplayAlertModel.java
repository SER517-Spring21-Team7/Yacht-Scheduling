package tys.tysWebserver.displayAlert.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "displayAlert")
public class DisplayAlertModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Lob
	@Column(name = "text")
	private String text;
	
	@Column(name = "watercraftId")
	private int watercraftId;
	
	@Column(name = "addedOn")
	private Date addedOn;

	@Override
	public String toString() {
		return "DisplayAlertModel [id=" + id + ", text=" + text + ", watercraftId=" + watercraftId + ", addedOn="
				+ addedOn + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getWatercraftId() {
		return watercraftId;
	}

	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}

	public Date getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(Date addedOn) {
		this.addedOn = addedOn;
	}
	
	
}
