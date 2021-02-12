package tys.tysWebserver.accountManager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notificationsetting")
public class UserNotificationSetting {
	
	@Id
	@Column(name = "userid")
	private int userId;
	@Column(name = "sendmessage")
	private boolean sendMessage;
	@Column(name = "watercraftinvite")
	private boolean watercraftInvite;
	@Column(name = "requestapproval")
	private boolean requestApproval;
	@Column(name = "othersreservationadmin")
	private boolean othersReservationAdmin;
	@Column(name = "othersreservationmember")
	private boolean othersReservationMember;
	@Column(name = "schedulesometime")
	private boolean scheduleSomeTime;
	@Column(name = "eventsuggestion")
	private boolean eventSuggestion;
	@Column(name = "eventchange")
	private boolean eventChange;
	@Column(name = "eventcancel")
	private boolean eventCancel;
	@Column(name = "upcomingschedulereminder")
	private String upcomingScheduleReminder;
	@Column(name = "addedtoexpense")
	private boolean addedToExpense;
	
	@Override
	public String toString() {
		return "UserNotificationSetting [userId=" + userId + ", sendMessage=" + sendMessage + ", watercraftInvite="
				+ watercraftInvite + ", requestApproval=" + requestApproval + ", othersReservationAdmin="
				+ othersReservationAdmin + ", othersReservationMember=" + othersReservationMember
				+ ", scheduleSomeTime=" + scheduleSomeTime + ", eventSuggestion=" + eventSuggestion + ", eventChange="
				+ eventChange + ", eventCancel=" + eventCancel + ", upcomingScheduleReminder="
				+ upcomingScheduleReminder + ", addedToExpense=" + addedToExpense + "]";
	}
	public UserNotificationSetting() {
		super();
	}
	public UserNotificationSetting(int userId, boolean sendMessage, boolean watercraftInvite, boolean requestApproval,
			boolean othersReservationAdmin, boolean othersReservationMember, boolean scheduleSomeTime,
			boolean eventSuggestion, boolean eventChange, boolean eventCancel, String upcomingScheduleReminder,
			boolean addedToExpense) {
		super();
		this.userId = userId;
		this.sendMessage = sendMessage;
		this.watercraftInvite = watercraftInvite;
		this.requestApproval = requestApproval;
		this.othersReservationAdmin = othersReservationAdmin;
		this.othersReservationMember = othersReservationMember;
		this.scheduleSomeTime = scheduleSomeTime;
		this.eventSuggestion = eventSuggestion;
		this.eventChange = eventChange;
		this.eventCancel = eventCancel;
		this.upcomingScheduleReminder = upcomingScheduleReminder;
		this.addedToExpense = addedToExpense;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public boolean isSendMessage() {
		return sendMessage;
	}
	public void setSendMessage(boolean sendMessage) {
		this.sendMessage = sendMessage;
	}
	public boolean isWatercraftInvite() {
		return watercraftInvite;
	}
	public void setWatercraftInvite(boolean watercraftInvite) {
		this.watercraftInvite = watercraftInvite;
	}
	public boolean isRequestApproval() {
		return requestApproval;
	}
	public void setRequestApproval(boolean requestApproval) {
		this.requestApproval = requestApproval;
	}
	public boolean isOthersReservationAdmin() {
		return othersReservationAdmin;
	}
	public void setOthersReservationAdmin(boolean othersReservationAdmin) {
		this.othersReservationAdmin = othersReservationAdmin;
	}
	public boolean isOthersReservationMember() {
		return othersReservationMember;
	}
	public void setOthersReservationMember(boolean othersReservationMember) {
		this.othersReservationMember = othersReservationMember;
	}
	public boolean isScheduleSomeTime() {
		return scheduleSomeTime;
	}
	public void setScheduleSomeTime(boolean scheduleSomeTime) {
		this.scheduleSomeTime = scheduleSomeTime;
	}
	public boolean isEventSuggestion() {
		return eventSuggestion;
	}
	public void setEventSuggestion(boolean eventSuggestion) {
		this.eventSuggestion = eventSuggestion;
	}
	public boolean isEventChange() {
		return eventChange;
	}
	public void setEventChange(boolean eventChange) {
		this.eventChange = eventChange;
	}
	public boolean isEventCancel() {
		return eventCancel;
	}
	public void setEventCancel(boolean eventCancel) {
		this.eventCancel = eventCancel;
	}
	public String getUpcomingScheduleReminder() {
		return upcomingScheduleReminder;
	}
	public void setUpcomingScheduleReminder(String upcomingScheduleReminder) {
		this.upcomingScheduleReminder = upcomingScheduleReminder;
	}
	public boolean isAddedToExpense() {
		return addedToExpense;
	}
	public void setAddedToExpense(boolean addedToExpense) {
		this.addedToExpense = addedToExpense;
	}

}
