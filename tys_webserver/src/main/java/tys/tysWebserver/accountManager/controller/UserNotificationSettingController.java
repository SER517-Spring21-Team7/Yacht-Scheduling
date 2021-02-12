package tys.tysWebserver.accountManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.accountManager.model.UserNotificationSetting;
import tys.tysWebserver.accountManager.repository.UserNotificationSettingRepo;

@RestController
public class UserNotificationSettingController {
	
	@Autowired
	private UserNotificationSettingRepo UNSRepo;
	
	
	@GetMapping("/user/{id}/nsetting")
	public ResponseEntity<UserNotificationSetting> getNotificationSettingById(@PathVariable(value = "id") Integer userId)
			throws ResourceNotFoundException {
		UserNotificationSetting unsObject = UNSRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + userId));
		return ResponseEntity.ok().body(unsObject);
	}
	
	@PutMapping("/user/{id}/nsetting")
	public ResponseEntity<UserNotificationSetting> updateNotificationById(@PathVariable(value = "id") Integer userId,
			@RequestBody UserNotificationSetting unsRequest)
			throws ResourceNotFoundException {
		UserNotificationSetting unsObject = UNSRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + userId));

		unsObject.setAddedToExpense(unsRequest.isAddedToExpense());
		unsObject.setEventCancel(unsRequest.isEventCancel());
		unsObject.setEventChange(unsRequest.isEventChange());
		unsObject.setEventSuggestion(unsRequest.isEventSuggestion());
		unsObject.setOthersReservationAdmin(unsRequest.isOthersReservationAdmin());
		unsObject.setOthersReservationMember(unsRequest.isOthersReservationMember());
		unsObject.setRequestApproval(unsRequest.isRequestApproval());
		unsObject.setWatercraftInvite(unsRequest.isWatercraftInvite());
		unsObject.setScheduleSomeTime(unsRequest.isScheduleSomeTime());
		unsObject.setSendMessage(unsRequest.isSendMessage());
		unsObject.setUpcomingScheduleReminder(unsRequest.getUpcomingScheduleReminder());
		final UserNotificationSetting updatedSetting = UNSRepo.save(unsObject);
		return ResponseEntity.ok(updatedSetting);
	}

}
