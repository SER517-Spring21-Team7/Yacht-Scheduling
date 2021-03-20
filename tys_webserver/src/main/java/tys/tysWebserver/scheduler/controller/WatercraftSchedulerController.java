package tys.tysWebserver.scheduler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.scheduler.model.WatercraftScheduler;
import tys.tysWebserver.scheduler.repository.WatercraftSchedulerRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WatercraftSchedulerController {
	
	@Autowired
	WatercraftSchedulerRepository WSRepo;
	
	@PostMapping("/addschedule")
	public WatercraftScheduler createSchedule(@RequestBody WatercraftScheduler newSchedule) {
		WatercraftScheduler savedSchedule = WSRepo.save(newSchedule);
		return savedSchedule;
	}
	
	@GetMapping("/getschedule/{wid}")
	public ResponseEntity<List<WatercraftScheduler>> getScheduleByWatercraft(@PathVariable(value="wid") Integer watercraftId)
		throws ResourceNotFoundException {
		List<WatercraftScheduler> schedule = WSRepo.findByWatercraftid(watercraftId);
			return ResponseEntity.ok().body(schedule);
	}

}
