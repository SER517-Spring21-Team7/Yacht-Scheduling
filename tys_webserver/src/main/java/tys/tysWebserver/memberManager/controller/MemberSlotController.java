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
}
