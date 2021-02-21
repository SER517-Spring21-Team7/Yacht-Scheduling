package tys.tysWebserver.scheduler.model;

import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;
import javax.persistence.*;

@Entity
@Table(name="schedulersetting")
public class SchedulerSetting {
	
	@Id
	@Column(name="watercraftid")
	private int watercraftId;
	//TODO private List<String> premiumDays; // Is List really needed? can we work around?
	@ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "timeslot", joinColumns = @JoinColumn(name = "watercraftid"))
	private List<TimeSlot> timeSlot = new ArrayList<>();
	@Column(name="watercraftid")
	private boolean blockAllShareOneSlot;
	@Column(name="watercraftid")
	private int maxContinuousBookingDays;
	@Column(name="watercraftid")
	private int freeBookingAfterHours;
	@Column(name="watercraftid")
	private int confirmationBeforeHours;
	@Column(name="watercraftid")
	private int noResponseCancelAtHours;
	@Column(name="watercraftid")
	private String weatherCountry;
	@Column(name="watercraftid")
	private String weatherCity;
	@Column(name="watercraftid")
	private String weatherZipCode;
	@Column(name="watercraftid")
	private String holidayCalName;
	@Column(name="watercraftid")
	private int maxHolidayBookingDays;
	@Column(name="watercraftid")
	private TimeZone timeZone;
	@Column(name="watercraftid")
	private boolean allowCarryBorrow;
	@Column(name="watercraftid")
	private boolean ignoreSharePercent;
	@Column(name="watercraftid")
	private int limitAdvBookingMonths;
	// TODO few fields about limiting reservation is pending
	
	
	public SchedulerSetting() {
		super();
	}
	
	@Override
	public String toString() {
		return "SchedulerSetting [watercraftId=" + watercraftId + ", timeSlot=" + timeSlot + ", blockAllShareOneSlot="
				+ blockAllShareOneSlot + ", maxContinuousBookingDays=" + maxContinuousBookingDays
				+ ", freeBookingAfterHours=" + freeBookingAfterHours + ", confirmationBeforeHours="
				+ confirmationBeforeHours + ", noResponseCancelAtHours=" + noResponseCancelAtHours + ", weatherCountry="
				+ weatherCountry + ", weatherCity=" + weatherCity + ", weatherZipCode=" + weatherZipCode
				+ ", holidayCalName=" + holidayCalName + ", maxHolidayBookingDays=" + maxHolidayBookingDays
				+ ", timeZone=" + timeZone + ", allowCarryBorrow=" + allowCarryBorrow + ", ignoreSharePercent="
				+ ignoreSharePercent + ", limitAdvBookingMonths=" + limitAdvBookingMonths + "]";
	}

	public SchedulerSetting(int watercraftId, List<TimeSlot> timeSlot, boolean blockAllShareOneSlot,
			int maxContinuousBookingDays, int freeBookingAfterHours, int confirmationBeforeHours,
			int noResponseCancelAtHours, String weatherCountry, String weatherCity, String weatherZipCode,
			String holidayCalName, int maxHolidayBookingDays, TimeZone timeZone, boolean allowCarryBorrow,
			boolean ignoreSharePercent, int limitAdvBookingMonths) {
		super();
		this.watercraftId = watercraftId;
		this.timeSlot = timeSlot;
		this.blockAllShareOneSlot = blockAllShareOneSlot;
		this.maxContinuousBookingDays = maxContinuousBookingDays;
		this.freeBookingAfterHours = freeBookingAfterHours;
		this.confirmationBeforeHours = confirmationBeforeHours;
		this.noResponseCancelAtHours = noResponseCancelAtHours;
		this.weatherCountry = weatherCountry;
		this.weatherCity = weatherCity;
		this.weatherZipCode = weatherZipCode;
		this.holidayCalName = holidayCalName;
		this.maxHolidayBookingDays = maxHolidayBookingDays;
		this.timeZone = timeZone;
		this.allowCarryBorrow = allowCarryBorrow;
		this.ignoreSharePercent = ignoreSharePercent;
		this.limitAdvBookingMonths = limitAdvBookingMonths;
	}
	
	public int getWatercraftId() {
		return watercraftId;
	}
	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}
	public List<TimeSlot> getTimeSlot() {
		return timeSlot;
	}
	public void setTimeSlot(List<TimeSlot> timeSlot) {
		this.timeSlot = timeSlot;
	}
	public boolean isBlockAllShareOneSlot() {
		return blockAllShareOneSlot;
	}
	public void setBlockAllShareOneSlot(boolean blockAllShareOneSlot) {
		this.blockAllShareOneSlot = blockAllShareOneSlot;
	}
	public int getMaxContinuousBookingDays() {
		return maxContinuousBookingDays;
	}
	public void setMaxContinuousBookingDays(int maxContinuousBookingDays) {
		this.maxContinuousBookingDays = maxContinuousBookingDays;
	}
	public int getFreeBookingAfterHours() {
		return freeBookingAfterHours;
	}
	public void setFreeBookingAfterHours(int freeBookingAfterHours) {
		this.freeBookingAfterHours = freeBookingAfterHours;
	}
	public int getConfirmationBeforeHours() {
		return confirmationBeforeHours;
	}
	public void setConfirmationBeforeHours(int confirmationBeforeHours) {
		this.confirmationBeforeHours = confirmationBeforeHours;
	}
	public int getNoResponseCancelAtHours() {
		return noResponseCancelAtHours;
	}
	public void setNoResponseCancelAtHours(int noResponseCancelAtHours) {
		this.noResponseCancelAtHours = noResponseCancelAtHours;
	}
	public String getWeatherCountry() {
		return weatherCountry;
	}
	public void setWeatherCountry(String weatherCountry) {
		this.weatherCountry = weatherCountry;
	}
	public String getWeatherCity() {
		return weatherCity;
	}
	public void setWeatherCity(String weatherCity) {
		this.weatherCity = weatherCity;
	}
	public String getWeatherZipCode() {
		return weatherZipCode;
	}
	public void setWeatherZipCode(String weatherZipCode) {
		this.weatherZipCode = weatherZipCode;
	}
	public String getHolidayCalName() {
		return holidayCalName;
	}
	public void setHolidayCalName(String holidayCalName) {
		this.holidayCalName = holidayCalName;
	}
	public int getMaxHolidayBookingDays() {
		return maxHolidayBookingDays;
	}
	public void setMaxHolidayBookingDays(int maxHolidayBookingDays) {
		this.maxHolidayBookingDays = maxHolidayBookingDays;
	}
	public TimeZone getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(TimeZone timeZone) {
		this.timeZone = timeZone;
	}
	public boolean isAllowCarryBorrow() {
		return allowCarryBorrow;
	}
	public void setAllowCarryBorrow(boolean allowCarryBorrow) {
		this.allowCarryBorrow = allowCarryBorrow;
	}
	public boolean isIgnoreSharePercent() {
		return ignoreSharePercent;
	}
	public void setIgnoreSharePercent(boolean ignoreSharePercent) {
		this.ignoreSharePercent = ignoreSharePercent;
	}
	public int getLimitAdvBookingMonths() {
		return limitAdvBookingMonths;
	}
	public void setLimitAdvBookingMonths(int limitAdvBookingMonths) {
		this.limitAdvBookingMonths = limitAdvBookingMonths;
	}
	
	
}
