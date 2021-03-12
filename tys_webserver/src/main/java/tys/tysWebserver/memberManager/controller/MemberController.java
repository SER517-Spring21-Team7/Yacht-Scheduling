package tys.tysWebserver.memberManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.memberManager.repository.MemberRepository;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/member")

public class MemberController {
	
	@Autowired
	private MemberRepository AMrepo;
	@PostMapping("/details")
	public MemberModel createMember(@RequestBody MemberModel addmember) {
		System.out.println(addmember);
		return AMrepo.save(addmember);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllMember")
	public List<MemberModel> finalAll() {
		List<MemberModel> data = AMrepo.findAll();
		return data;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/searchMember")
	public List<MemberModel> searchMember(@RequestParam String searchQuery) {
//		List<MemberModel> data = AMrepo.
		List<MemberModel> ans = AMrepo.findByFirstnameIgnoreCaseContaining(searchQuery);
		return ans;
	}

}
