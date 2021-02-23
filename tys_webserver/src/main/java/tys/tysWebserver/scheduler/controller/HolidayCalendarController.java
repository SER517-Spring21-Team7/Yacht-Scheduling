package tys.tysWebserver.scheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.scheduler.model.HolidayCalendar;
import tys.tysWebserver.scheduler.repository.HolidayCalendarRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HolidayCalendarController {

	@Autowired
	HolidayCalendarRepo hcRepo;

	@GetMapping("/holidaycalendar/{id}")
	public ResponseEntity<HolidayCalendar> getHolidayCalendarById(@PathVariable(value = "id") Integer calendarId)
			throws ResourceNotFoundException {
		HolidayCalendar hcObject = hcRepo.findById(calendarId).orElseThrow(
				() -> new ResourceNotFoundException("Holiday Calendar not found for this id :: " + calendarId));
		return ResponseEntity.ok().body(hcObject);
	}

	@GetMapping("/holidaycalendar")
	public ResponseEntity<List<HolidayCalendar>> getAllHolidayCalendar() throws ResourceNotFoundException {
		List<HolidayCalendar> hcObject = hcRepo.findAll();
		return ResponseEntity.ok().body(hcObject);
	}

	@PutMapping("/holidaycalendar/{id}")
	public ResponseEntity<HolidayCalendar> updateHolidaycalendarById(@PathVariable(value = "id") Integer calendarId,
			@RequestBody HolidayCalendar hcRequest) throws ResourceNotFoundException {
		System.out.println("Request Object is :: " + hcRequest);
		HolidayCalendar hcObject = hcRepo.findById(calendarId).orElseThrow(
				() -> new ResourceNotFoundException("Holiday Calendar not found for this id :: " + calendarId));

		hcObject.setName(hcRequest.getName());
		hcObject.setListOfHoliday(hcRequest.getListOfHoliday());
		final HolidayCalendar updatedCalendar = hcRepo.save(hcObject);
		return ResponseEntity.ok(updatedCalendar);
	}

	// Currently Id is auto generated and not coming from UI.
	// if we have to store Id in the React state then fine
	// or we have to add calendar year and use composite key year+name.
	@PostMapping("/holidaycalendar")
	public ResponseEntity<HolidayCalendar> addHolidayCalendarById(@RequestBody HolidayCalendar hcRequest)
			throws ResourceNotFoundException {
		System.out.println("Request Object is :: " + hcRequest);
		final HolidayCalendar newCalendar = hcRepo.save(hcRequest);
		return ResponseEntity.ok(newCalendar);
	}

}
