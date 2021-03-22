package tys.tysWebserver.scheduler.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Embeddable
public class Reservation {
	
	@Column(name="slotnumber")
	private int slotNumber; // sequence starting from 1 to total number of slots in the booking, help is deletion
	@Column(name="starthour")
	private int startHour;
	@Column(name="endhour")
	private int endHour;
	@Column(name="optionalnote")
	private String optionalNote;
	
	@Override
	public String toString() {
		return "Reservation [slotNumber=" + slotNumber + ", startHour=" + startHour + ", endHour=" + endHour
				+ ", optionalNote=" + optionalNote + "]";
	}

	public Reservation() {
		super();
	}

	public Reservation(int slotNumber, int startHour, int endHour, String optionalNote) {
		super();
		this.slotNumber = slotNumber;
		this.startHour = startHour;
		this.endHour = endHour;
		this.optionalNote = optionalNote;
	}
	
	public int getSlotNumber() {
		return slotNumber;
	}

	public void setSlotNumber(int slotNumber) {
		this.slotNumber = slotNumber;
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

	public String getOptionalNote() {
		return optionalNote;
	}

	public void setOptionalNote(String optionalNote) {
		this.optionalNote = optionalNote;
	}
	
}
