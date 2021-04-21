package tys.tysWebserver.scheduler.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Embeddable
public class Reservation {
	
	@Column(name="fordate")
	private Date forDate;
	@Column(name="starthour")
	private String startHour;
	@Column(name="endhour")
	private String endHour;
	
	@Override
	public String toString() {
		return "Reservation [forDate=" + forDate + ", startHour=" + startHour + ", endHour=" + endHour + "]";
	}

	public Reservation() {
		super();
	}

	public Reservation(Date forDate, String startHour, String endHour) {
		super();
		this.forDate = forDate;
		this.startHour = startHour;
		this.endHour = endHour;
	}

	public Date getForDate() {
		return forDate;
	}

	public void setForDate(Date forDate) {
		this.forDate = forDate;
	}

	public String getStartHour() {
		return startHour;
	}

	public void setStartHour(String startHour) {
		this.startHour = startHour;
	}

	public String getEndHour() {
		return endHour;
	}

	public void setEndHour(String endHour) {
		this.endHour = endHour;
	}
	
}
