package tys.tysWebserver.scheduler.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Holiday {

	@Column(name = "holidayname")
	private String holidayName;
	@Column(name = "holidaydate")
	private Date holidayDate;

	public Holiday() {
		super();
	}

	public Holiday(String holidayName, Date holidayDate) {
		super();
		this.holidayName = holidayName;
		this.holidayDate = holidayDate;
	}

	@Override
	public String toString() {
		return "HolidayDetails [holidayName=" + holidayName + ", holidayDate=" + holidayDate + "]";
	}

	public String getHolidayName() {
		return holidayName;
	}

	public void setHolidayName(String holidayName) {
		this.holidayName = holidayName;
	}

	public Date getHolidayDate() {
		return holidayDate;
	}

	public void setHolidayDate(Date holidayDate) {
		this.holidayDate = holidayDate;
	}

}
