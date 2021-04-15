package tys.tysWebserver.scheduler.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.scheduler.model.SchedulerSetting;
import tys.tysWebserver.scheduler.repository.SchedulerSettingRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SchedulerSettingController {

	@Autowired
	SchedulerSettingRepo ssr;

	@GetMapping("/watercraft/{id}/ssetting")
	public ResponseEntity<SchedulerSetting> getSchedulerSettingById(@PathVariable(value = "id") Integer watercraftId)
			throws ResourceNotFoundException {
		SchedulerSetting ssObject = ssr.findById(watercraftId).orElseThrow(
				() -> new ResourceNotFoundException("Scheduler setting not found for this id :: " + watercraftId));
		return ResponseEntity.ok().body(ssObject);
	}

	@PutMapping("/watercraft/{id}/ssetting")
	public ResponseEntity<SchedulerSetting> updateSchedulerSettingById(@PathVariable(value = "id") Integer watercraftId,
			@RequestBody SchedulerSetting ssRequest) throws ResourceNotFoundException {
		System.out.println("Request Object is :: " + ssRequest);
		SchedulerSetting ssObject = ssr.findById(watercraftId).orElseThrow(
				() -> new ResourceNotFoundException("Scheduler setting not found for this id :: " + watercraftId));
		ssObject.setPremiumDays(ssRequest.getPremiumDays());
		ssObject.setTimeSlot(ssRequest.getTimeSlot());
		ssObject.setBlockAllOneSlotBooking(ssRequest.isBlockAllOneSlotBooking());
		ssObject.setMaxContinuousBookingDays(ssRequest.getMaxContinuousBookingDays());
		ssObject.setFreeBookingAfterHours(ssRequest.getFreeBookingAfterHours());
		ssObject.setConfirmationBeforeHours(ssRequest.getConfirmationBeforeHours());
		ssObject.setNoResponseCancelAtHours(ssRequest.getNoResponseCancelAtHours());
		ssObject.setWeatherCountry(ssRequest.getWeatherCountry());
		ssObject.setWeatherCity(ssRequest.getWeatherCity());
		ssObject.setWeatherZipCode(ssRequest.getWeatherZipCode());
		ssObject.setHolidayCalName(ssRequest.getHolidayCalName());
		ssObject.setMaxHolidayBookingDays(ssRequest.getMaxHolidayBookingDays());
		ssObject.setTimeZone(ssRequest.getTimeZone());
		ssObject.setAllowCarryBorrow(ssRequest.isAllowCarryBorrow());
		ssObject.setLimitAdvBookingMonths(ssRequest.getLimitAdvBookingMonths());
		final SchedulerSetting updatedSetting = ssr.save(ssObject);
		return ResponseEntity.ok(updatedSetting);
	}

	public ResponseEntity<SchedulerSetting> addSchedulerSettingById(int watercraftId) throws ResourceNotFoundException {
		SchedulerSetting ssObject = new SchedulerSetting();
		ssObject.setWatercraftId(watercraftId);
		// These are default values for scheduler setting, to be set for every new watercraft added
		List<String> premiumDays = new ArrayList<String>();
		premiumDays.add("Saturday");
		premiumDays.add("Sunday");
		ssObject.setPremiumDays(premiumDays);
		ssObject.setTimeSlot(null); //Time slot must be set manually??
		ssObject.setBlockAllOneSlotBooking(true);
		ssObject.setMaxContinuousBookingDays(7);
		ssObject.setFreeBookingAfterHours(12);
		ssObject.setConfirmationBeforeHours(72);
		ssObject.setNoResponseCancelAtHours(24);
		ssObject.setWeatherCountry("");
		ssObject.setWeatherCity("");
		ssObject.setWeatherZipCode("");
		ssObject.setHolidayCalName("");
		ssObject.setMaxHolidayBookingDays(2);
		ssObject.setTimeZone(null);
		ssObject.setAllowCarryBorrow(true);
		ssObject.setLimitAdvBookingMonths(3);
		final SchedulerSetting savedSetting = ssr.save(ssObject);
		return ResponseEntity.ok(savedSetting);
	}
	
	public int findMaxHolidayBookingDaysByWatercraftId(Integer id) {
		SchedulerSetting ssObject = ssr.findById(id).orElse(null);
		return ssObject.getMaxHolidayBookingDays();
	}

}
