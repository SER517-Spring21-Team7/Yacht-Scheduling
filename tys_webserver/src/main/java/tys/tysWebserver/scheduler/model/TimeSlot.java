package tys.tysWebserver.scheduler.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TimeSlot {
	@Column(name = "starthour")
	private String startHour;
	@Column(name = "endhour")
	private String endHour;
	@Column(name = "rownum")
	private int rownum;

	@Override
	public String toString() {
		return "TimeSlot [startHour=" + startHour + ", endHour=" + endHour + ", rownum=" + rownum + "]";
	}

	public TimeSlot() {
		super();
	}

	public TimeSlot(String startHour, String endHour, int rownum) {
		super();
		this.startHour = startHour;
		this.endHour = endHour;
		this.rownum = rownum;
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
	
	public int getRownum() {
		return rownum;
	}

	public void setRownum(int rownum) {
		this.rownum = rownum;
	}

}
