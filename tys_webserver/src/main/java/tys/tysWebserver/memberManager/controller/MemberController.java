package tys.tysWebserver.memberManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.accountManager.controller.UserAccountController;
import tys.tysWebserver.accountManager.model.UserNotificationSetting;
import tys.tysWebserver.accountManager.model.UserProfile;
import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.memberManager.repository.AddMemberRepo;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/member")

public class MemberController {
	
	@Autowired
	private AddMemberRepo AMrepo;
	
	@Autowired
	UserAccountController userAccController;
	
	@PostMapping("/details")
	public MemberModel createMember(@RequestBody MemberModel addmember) {
		System.out.println(addmember);
		MemberModel savedMember = AMrepo.save(addmember);
		UserProfile userProfile = new UserProfile();
		userProfile.setUserId(savedMember.getMemberId());
		userProfile.setFirstName(savedMember.getFirstname());
		userProfile.setLastName(savedMember.getLastname());
		userAccController.createUserProfile(userProfile);
		userAccController.createDefaultUserNotification(savedMember.getMemberId());
		return savedMember;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllMember")
	public List<MemberModel> finalAll() {
		List<MemberModel> data = AMrepo.findAll();
		return data;
	}

}
