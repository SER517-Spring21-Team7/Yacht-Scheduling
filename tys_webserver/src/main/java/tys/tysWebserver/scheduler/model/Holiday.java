package tys.tysWebserver.scheduler.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Holiday {

	@Column(name = "rownum")
	private int rownum;
	@Column(name = "holidayname")
	private String holidayName;
	@Column(name = "holidaydate")
	private Date holidayDate;

	public Holiday() {
		super();
	}

	public Holiday(int rowNum, String holidayName, Date holidayDate) {
		super();
		this.rownum = rowNum;
		this.holidayName = holidayName;
		this.holidayDate = holidayDate;
	}

	@Override
	public String toString() {
		return "HolidayDetails [holidayName=" + holidayName + ", holidayDate=" + holidayDate + "]";
	}

	public int getRownum( ) {
		return rownum;
	}
	
	public void setRownum(int rownum) {
		this.rownum = rownum;
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
