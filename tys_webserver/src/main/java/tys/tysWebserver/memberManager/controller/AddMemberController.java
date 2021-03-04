package tys.tysWebserver.memberManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.memberManager.repository.AddMemberRepo;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/member")

public class AddMemberController {
	
	@Autowired
	private AddMemberRepo AMrepo;
	@PostMapping("/details")
	public MemberModel createMember(@RequestBody MemberModel addmember) {
		System.out.println(addmember);
		return AMrepo.save(addmember);
	}

}
