package tys.tysWebserver.scheduler.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

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
		return "Reservation [slotnum=" + slotNumber + ", starthour=" + startHour + ", endhour=" + endHour
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

	public int getSlotnum() {
		return slotNumber;
	}

	public void setSlotnum(int slotnum) {
		this.slotNumber = slotnum;
	}

	public int getStarthour() {
		return startHour;
	}

	public void setStarthour(int starthour) {
		this.startHour = starthour;
	}

	public int getEndhour() {
		return endHour;
	}

	public void setEndhour(int endhour) {
		this.endHour = endhour;
	}

	public String getOptionalNote() {
		return optionalNote;
	}

	public void setOptionalNote(String optionalNote) {
		this.optionalNote = optionalNote;
	}
	
}
