package tys.tysWebserver.scheduler.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "holidaycalendar")
public class HolidayCalendar {

	@Id
	@GeneratedValue
	@Column(name = "calendarid")
	private int Id;
	@Column(name = "calendarname")
	private String name;
	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "holiday", joinColumns = @JoinColumn(name = "Id"))
	private List<Holiday> listOfHoliday = new ArrayList<>();

	public HolidayCalendar() {
		super();
	}

	public HolidayCalendar(int id, String name, List<Holiday> listOfHoliday) {
		super();
		Id = id;
		this.name = name;
		this.listOfHoliday = listOfHoliday;
	}

	@Override
	public String toString() {
		return "CountryHoliday [Id=" + Id + ", name=" + name + ", listOfHoliday=" + listOfHoliday + "]";
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Holiday> getListOfHoliday() {
		return listOfHoliday;
	}

	public void setListOfHoliday(List<Holiday> listOfHoliday) {
		this.listOfHoliday = listOfHoliday;
	}

}
