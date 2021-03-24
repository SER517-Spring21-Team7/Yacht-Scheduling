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
	private int startHour;
	@Column(name="endhour")
	private int endHour;
	
	@Override
	public String toString() {
		return "Reservation [forDate=" + forDate + ", startHour=" + startHour + ", endHour=" + endHour + "]";
	}

	public Reservation() {
		super();
	}

	public Reservation(Date forDate, int startHour, int endHour) {
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

	public int getStartHour() {
		return startHour;
	}

	public void setStartHour(int startHour) {
		this.startHour = startHour;
	}

	public int getEndHour() {
		return endHour;
	}

	public void setEndHour(int endHour) {
		this.endHour = endHour;
	}
	
}
