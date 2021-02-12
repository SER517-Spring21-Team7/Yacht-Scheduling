package tys.tysWebserver.accountManager.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tys.tysWebserver.accountManager.model.UserNotificationSetting;
import tys.tysWebserver.accountManager.model.UserProfile;
import tys.tysWebserver.accountManager.repository.UserNotificationSettingRepo;
import tys.tysWebserver.accountManager.repository.UserProfileRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserAccountController {
	
	@Autowired
	private UserNotificationSettingRepo UNSRepo;
	@Autowired
	private UserProfileRepo UPRepo;
	
	// Below methods are for notification setting related API
	@GetMapping("/user/{id}/nsetting")
	public ResponseEntity<UserNotificationSetting> getNotificationSettingById(@PathVariable(value = "id") Integer userId)
			throws ResourceNotFoundException {
		UserNotificationSetting unsObject = UNSRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification setting not found for this id :: " + userId));
		return ResponseEntity.ok().body(unsObject);
	}
	
	@PutMapping("/user/{id}/nsetting")
	public ResponseEntity<UserNotificationSetting> updateNotificationById(@PathVariable(value = "id") Integer userId,
			@RequestBody UserNotificationSetting unsRequest)
			throws ResourceNotFoundException {
		UserNotificationSetting unsObject = UNSRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification setting not found for this id :: " + userId));
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

	// Below methods are for profile related API
	@GetMapping("/user/{id}/profile")
	public ResponseEntity<UserProfile> getUserProfileById(@PathVariable(value = "id") Integer userId)
			throws ResourceNotFoundException {
		UserProfile upObject = UPRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Profile not found for id :: " + userId));
		return ResponseEntity.ok().body(upObject);
	}
	
	@PutMapping("/user/{id}/profile")
	public ResponseEntity<UserProfile> updateUserProfileById(@PathVariable(value = "id") Integer userId,
			@RequestBody UserProfile upRequest)
			throws ResourceNotFoundException {
		UserProfile upObject = UPRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Profile not found for id :: " + userId));

		upObject.setFirstName(upRequest.getFirstName());
		upObject.setLastName(upRequest.getLastName());
		upObject.setMobile(upRequest.getMobile());
		upObject.setAlternateMobile(upRequest.getAlternateMobile());
		upObject.setTimezone(upRequest.getTimezone());
		upObject.setCountry(upRequest.getCountry());
		upObject.setAddress_1(upRequest.getAddress_1());
		upObject.setAddress_2(upRequest.getAddress_2());
		upObject.setCity(upRequest.getCity());
		upObject.setState(upRequest.getState());
		upObject.setZipCode(upRequest.getZipCode());
		final UserProfile updatedProfile = UPRepo.save(upObject);
		return ResponseEntity.ok(updatedProfile);
	}
}
