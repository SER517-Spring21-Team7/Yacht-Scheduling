package tys.tysWebserver.scheduler.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TimeSlot {
	@Column(name = "starthour")
	private int startHour;
	@Column(name = "endhour")
	private int endHour;
	
	@Override
	public String toString() {
		return "TimeSlot [startHour=" + startHour + ", endHour=" + endHour + "]";
	}
	public TimeSlot() {
		super();
	}
	public TimeSlot(int startHour, int endHour) {
		super();
		this.startHour = startHour;
		this.endHour = endHour;
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
