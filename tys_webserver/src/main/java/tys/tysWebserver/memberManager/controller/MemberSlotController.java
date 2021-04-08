package tys.tysWebserver.memberManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.memberManager.model.MemberSlot;
import tys.tysWebserver.memberManager.repository.MemberSlotRepository;
import tys.tysWebserver.scheduler.controller.SchedulerSettingController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MemberSlotController {
	
	@Autowired
	MemberSlotRepository msr;
	
	@Autowired
	SchedulerSettingController ssController;

	public void createMemberSlot(int memberId, int watercraftId, int slotCount) {
		int holidaySlotCount = ssController.findMaxHolidayBookingDaysByWatercraftId(watercraftId);
		System.out.println("+++++++HOLIDAY SLOT COUNT++++++" + holidaySlotCount);
		MemberSlot msObject = new MemberSlot();
		msObject.setMemberId(memberId);
		msObject.setWatercraftId(watercraftId);
		msObject.setCurrMonthSlot(slotCount);
		msObject.setNextMonthSlot(slotCount);
		msObject.setPrevMonthSlot(0);
		msObject.setHolidaySlot(holidaySlotCount);
		msr.save(msObject);
	}
	
	public void updateMemberSlot(MemberSlot currentSlot, int standardDeduction, boolean isHolidaySlot, boolean isCarryBorrow) {
		// Previous month slot
		if (isCarryBorrow) {
			if (standardDeduction - currentSlot.getPrevMonthSlot() > 0) {
				standardDeduction -= currentSlot.getPrevMonthSlot();
				currentSlot.setPrevMonthSlot(0);
			} else {
				currentSlot.setPrevMonthSlot(currentSlot.getPrevMonthSlot() - standardDeduction);
				standardDeduction = 0;
			}	
		}
		// Current month slot
		if (standardDeduction - currentSlot.getCurrMonthSlot() > 0) {
			standardDeduction -= currentSlot.getCurrMonthSlot();
			currentSlot.setCurrMonthSlot(0);
		} else {
			currentSlot.setCurrMonthSlot(currentSlot.getCurrMonthSlot() - standardDeduction);
			standardDeduction = 0;
		}
		// Next month slot
		if (isCarryBorrow) {
			if (standardDeduction - currentSlot.getNextMonthSlot() > 0) {
				standardDeduction -= currentSlot.getNextMonthSlot();
				currentSlot.setNextMonthSlot(0);
			} else {
				currentSlot.setNextMonthSlot(currentSlot.getNextMonthSlot() - standardDeduction);
				standardDeduction = 0;
			}	
		}
		// Holiday slot
		if (isHolidaySlot) {
			currentSlot.setHolidaySlot(currentSlot.getHolidaySlot()-1);
		}
		msr.save(currentSlot);
	}
}
