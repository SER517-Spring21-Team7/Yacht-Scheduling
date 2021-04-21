package tys.tysWebserver.displayAlert.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.displayAlert.model.DisplayAlertModel;
import tys.tysWebserver.displayAlert.repository.DisplayAlertRepo;
import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.memberManager.repository.MemberRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/displayAlert")
public class DisplayAlertController {

	@Autowired
	DisplayAlertRepo displayAlertRepo;
	
	@Autowired
	MemberRepository memberRepository;
	
	@PostMapping("/add")
	public ResponseEntity<DisplayAlertModel> addAlert(@RequestBody DisplayAlertModel displayAlertModel) {
		displayAlertModel.setAddedOn(new Date());
		displayAlertRepo.save(displayAlertModel);
		System.out.println(displayAlertModel.toString());
		return ResponseEntity.ok(displayAlertModel);
	}
	
	@GetMapping("/get/{id}")
	public List<DisplayAlertModel> getAlert(@PathVariable String id) {
		
		if(Integer.parseInt(id) == 60) {
			return displayAlertRepo.findAll();
		}
		HashSet<Integer> watercraftIds = new HashSet<>();
		List<MemberModel> memberEntries = memberRepository.findAllByMemberId(Integer.parseInt(id));
		for(MemberModel member : memberEntries) {
			watercraftIds.add(member.getWatercraftId());
		}
		
		List<DisplayAlertModel> listOfAlert = displayAlertRepo.getDisplayAlertsForMember(watercraftIds);
		
		return listOfAlert;
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAlert(@PathVariable String id) {
		displayAlertRepo.deleteById(Integer.parseInt(id));
	}
	
}
