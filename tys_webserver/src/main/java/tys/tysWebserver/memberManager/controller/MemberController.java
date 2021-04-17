package tys.tysWebserver.memberManager.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.accountManager.controller.LoginController;
import tys.tysWebserver.accountManager.controller.UserAccountController;
import tys.tysWebserver.accountManager.model.UserNotificationSetting;
import tys.tysWebserver.accountManager.model.UserProfile;
import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.memberManager.repository.MemberRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/member")

public class MemberController {
	
	@Autowired
	private MemberRepository AMrepo;
	@Autowired
	UserAccountController userAccController;
	
	@Autowired
	LoginController loginController;
	
	@Autowired
	PasswordEncoder pasEncoder;
 
  MemberSlotController msController;
	
	@PostMapping("/details")
	public MemberModel createMember(@RequestBody MemberModel addmember) {
		System.out.println(addmember);
		MemberModel savedMember = AMrepo.save(addmember);
		// Create user profile
		UserProfile userProfile = new UserProfile();
		userProfile.setUserId(savedMember.getMemberId());
		userProfile.setFirstName(savedMember.getFirstname());
		userProfile.setLastName(savedMember.getLastname());
		userAccController.createUserProfile(userProfile);
		// Create default notification for user
		userAccController.createDefaultUserNotification(savedMember.getMemberId());
		// Create login for user
		loginController.createCredentials(savedMember.getMemberId() ,addmember.getEmail(), pasEncoder.encode(addmember.getPassword()), addmember.getAccess());
		// Create slot for user
		msController.createMemberSlot(savedMember.getMemberId(), addmember.getWatercraftId(), Integer.parseInt(addmember.getStandardshare()));
		return savedMember;
	}
	
	@GetMapping("/getAllMember")
	public List<MemberModel> finalAll() {
		List<MemberModel> data = AMrepo.findAll();
		return data;
	}
	
	@GetMapping("/searchMember")
	public List<MemberModel> searchMember(@RequestParam String searchQuery) {
//		List<MemberModel> data = AMrepo.
		List<MemberModel> ans = AMrepo.findByFirstnameIgnoreCaseContaining(searchQuery);
		return ans;
	}
	
	@GetMapping("/getMember/{id}")
	public ResponseEntity<MemberModel> getMemberById(@PathVariable(value = "id") Integer memberId)
		throws ResourceNotFoundException {
		MemberModel memberObject = AMrepo.findById(memberId)
				.orElseThrow(() -> new ResourceNotFoundException("Member not found for this id :: " + memberId));
		return ResponseEntity.ok().body(memberObject);
	}

	@GetMapping("/getAllMemberDetails")
	public List<MemberModel> getAllMemberDetails() {
		List<MemberModel> data = AMrepo.findAll();
		if (ObjectUtils.isEmpty(data))
			return null;

		List<Integer> memberIds = new ArrayList<>();
		data.forEach((member) -> memberIds.add(member.getMemberId()));
		List<UserProfile> profiles = userAccController.getAllProfilesByUserIds(memberIds);

		if (ObjectUtils.isEmpty(profiles))
			return null;

		HashMap<Integer, String> imageMap = new HashMap<>();
		profiles.forEach((profile) -> imageMap.put(profile.getUserId(), profile.getImage()));

		data.forEach((member) -> member.setImage(imageMap.get(member.getMemberId())));

		return data;
	}
	
	@GetMapping("/getMemberByWatercraft/{wid}")
	public List<MemberModel> finalAllByWatercraft(@PathVariable(value = "wid") int watercraftId) {
		List<MemberModel> data = AMrepo.findByWatercraftId(watercraftId);
		return data;
	}
}
