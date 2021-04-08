package tys.tysWebserver.scheduler.controller;

import java.time.Duration;
import java.time.Period;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.scheduler.model.SchedulerSetting;
import tys.tysWebserver.scheduler.model.WatercraftScheduler;
import tys.tysWebserver.scheduler.repository.SchedulerSettingRepo;
import tys.tysWebserver.scheduler.repository.WatercraftSchedulerRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WatercraftSchedulerController {
	
	@Autowired
	WatercraftSchedulerRepository WSRepo;
	
	@Autowired
	SchedulerSettingRepo ssr;
	
	@PostMapping("/addschedule")
	public ResponseEntity<String> createSchedule(@RequestBody WatercraftScheduler newSchedule) {
		SchedulerSetting ssForWatercraft = ssr.findById(newSchedule.getWatercraftId()).orElseGet(null);
		if (isBookingAllowed(newSchedule, ssForWatercraft)) {
			WatercraftScheduler savedSchedule = WSRepo.save(newSchedule);
			return new ResponseEntity<String>("Success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Failed", HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@GetMapping("/getschedule/{wid}")
	public ResponseEntity<List<WatercraftScheduler>> getScheduleByWatercraft(@PathVariable(value="wid") Integer watercraftId)
		throws ResourceNotFoundException {
		List<WatercraftScheduler> schedule = WSRepo.findByWatercraftId(watercraftId);
			return ResponseEntity.ok().body(schedule);
	}
	
	@DeleteMapping("/deleteschedule/{sid}")
	public ResponseEntity<String> deleteReservation(@PathVariable(value="sid") String sid) {
		WSRepo.deleteById(Integer.parseInt(sid));
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	} 
	
	@PutMapping("/updateschedule/{scheduleid}")
	public ResponseEntity<WatercraftScheduler> deleteSlot(@RequestBody WatercraftScheduler updatedSchedule, @PathVariable Integer scheduleid)
		 throws ResourceNotFoundException {
		if (updatedSchedule.getReservation().size() == 0) {
			WSRepo.deleteById(scheduleid);
			return null;
		} else {
			WatercraftScheduler wsObject = WSRepo.findById(scheduleid).orElseThrow(
					() -> new ResourceNotFoundException("Schedule not found for this schedule id :: " + scheduleid));
			wsObject.setReservation(updatedSchedule.getReservation());
			final WatercraftScheduler savedSchedule = WSRepo.save(wsObject);
			return ResponseEntity.ok(savedSchedule);
		}
	}
	
	private boolean isBookingAllowed(WatercraftScheduler schedule, SchedulerSetting setting) {
		Date scheduleEnd = schedule.getReservation().get(schedule.getReservation().size()-1).getForDate();
		Date scheduleStart = schedule.getReservation().get(0).getForDate();
		int totalDays = (int)( (scheduleEnd.getTime() - scheduleStart.getTime()) / (1000 * 60 * 60 * 24) );
		if (totalDays > setting.getMaxContinuousBookingDays()) {
			return false;
		}
		int reservationDateAfter = (int)( (scheduleEnd.getTime() - schedule.getBookingDate().getTime()) / (1000 * 60 * 60 * 24) );
		if(reservationDateAfter > setting.getLimitAdvBookingMonths()*30) {
			return false;
		}
		return true;
		
	}

}
