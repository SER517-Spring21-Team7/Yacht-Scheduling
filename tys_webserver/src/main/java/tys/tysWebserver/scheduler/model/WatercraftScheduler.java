package tys.tysWebserver.scheduler.model;

import java.util.ArrayList;
import java.util.Date;
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
@Table(name = "watercraftscheduler")
public class WatercraftScheduler {
	
	@Id
	@GeneratedValue
	@Column(name ="scheduleid")
	private int scheduleId;
	@Column(name ="watercraftid")
	private int watercraftId;
	@Column(name ="userid")
	private int userId;
	@Column(name ="membername")
	private String memberName; // Change it to memeber name
	@Column(name ="bookingdate")
	private Date bookingDate;
	@Column(name ="notfromuserquota")
	private boolean notFromUserQuota;
	@Column(name ="formaintenance")
	private boolean forMaintenance;
	@Column(name ="conciergerequired")
	private boolean conciergeRequired;
	@Column(name ="crewrequired")
	private boolean crewRequired;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "reservation", joinColumns = @JoinColumn(name = "scheduleid"))
	private List<Reservation> reservation = new ArrayList<>();

	@Override
	public String toString() {
		return "WatercraftScheduler [scheduleId=" + scheduleId + ", watercraftId=" + watercraftId + ", userId=" + userId
				+ ", memberName=" + memberName + ", bookingDate=" + bookingDate + ", notFromUserQuota=" + notFromUserQuota
				+ ", forMaintenance=" + forMaintenance + ", conciergeRequired=" + conciergeRequired + ", crewRequired="
				+ crewRequired + ", reservation=" + reservation + "]";
	}

	public WatercraftScheduler() {
		super();
	}

	public WatercraftScheduler(int scheduleId, int watercraftId, int userId, String memberName, Date bookingDate,
			boolean notFromUserQuota, boolean forMaintenance, boolean conciergeRequired, boolean crewRequired,
			List<Reservation> reservation) {
		super();
		this.scheduleId = scheduleId;
		this.watercraftId = watercraftId;
		this.userId = userId;
		this.memberName = memberName;
		this.bookingDate = bookingDate;
		this.notFromUserQuota = notFromUserQuota;
		this.forMaintenance = forMaintenance;
		this.conciergeRequired = conciergeRequired;
		this.crewRequired = crewRequired;
		this.reservation = reservation;
	}

	public int getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(int scheduleId) {
		this.scheduleId = scheduleId;
	}

	public int getWatercraftId() {
		return watercraftId;
	}

	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public Date getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public boolean isNotFromUserQuota() {
		return notFromUserQuota;
	}

	public void setNotFromUserQuota(boolean notFromUserQuota) {
		this.notFromUserQuota = notFromUserQuota;
	}

	public boolean isForMaintenance() {
		return forMaintenance;
	}

	public void setForMaintenance(boolean forMaintenance) {
		this.forMaintenance = forMaintenance;
	}

	public List<Reservation> getReservation() {
		return reservation;
	}

	public void setReservation(List<Reservation> reservation) {
		this.reservation = reservation;
	}
	
	public boolean isConciergeRequired() {
		return conciergeRequired;
	}

	public void setConciergeRequired(boolean conciergeRequired) {
		this.conciergeRequired = conciergeRequired;
	}

	public boolean isCrewRequired() {
		return crewRequired;
	}

	public void setCrewRequired(boolean crewRequired) {
		this.crewRequired = crewRequired;
	}
	
}
