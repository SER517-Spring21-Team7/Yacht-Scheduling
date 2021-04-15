package tys.tysWebserver.memberManager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="memberslot")
public class MemberSlot {
	
	
	@Id
	@Column(name="memberid")
	private int memberId;
	@Column(name="watercraftid")
	private int watercraftId;
	@Column(name="holidayslot")
	private int holidaySlot;
	@Column(name="prevmonthslot")
	private int prevMonthSlot;
	@Column(name="currmonthslot")
	private int currMonthSlot;
	@Column(name="nextmonthslot")
	private int nextMonthSlot;
	
	@Override
	public String toString() {
		return "Member Slot [memberId=" + memberId + ", watercraftId=" + watercraftId + ", holidaySlot=" + holidaySlot + ", prevMonthslot="
				+ prevMonthSlot + ", currMonthSlot=" + currMonthSlot + ", nextMonthSlot=" + nextMonthSlot + "]";
	}
	
	public MemberSlot() {
		super();
	}
	public MemberSlot(int memberId, int watercraftId, int holidaySlot, int prevMonthSlot, int currMonthSlot, int nextMonthSlot) {
		super();
		this.memberId = memberId;
		this.watercraftId = watercraftId;
		this.holidaySlot = holidaySlot;
		this.prevMonthSlot = prevMonthSlot;
		this.currMonthSlot = currMonthSlot;
		this.nextMonthSlot = nextMonthSlot;
	}

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public int getWatercraftId() {
		return watercraftId;
	}

	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}

	public int getHolidaySlot() {
		return holidaySlot;
	}

	public void setHolidaySlot(int holidaySlot) {
		this.holidaySlot = holidaySlot;
	}

	public int getPrevMonthSlot() {
		return prevMonthSlot;
	}

	public void setPrevMonthSlot(int prevMonthSlot) {
		this.prevMonthSlot = prevMonthSlot;
	}

	public int getCurrMonthSlot() {
		return currMonthSlot;
	}

	public void setCurrMonthSlot(int currMonthSlot) {
		this.currMonthSlot = currMonthSlot;
	}

	public int getNextMonthSlot() {
		return nextMonthSlot;
	}

	public void setNextMonthSlot(int nextMonthSlot) {
		this.nextMonthSlot = nextMonthSlot;
	}
	
	
}
