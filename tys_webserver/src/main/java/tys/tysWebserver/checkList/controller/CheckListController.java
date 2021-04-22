package tys.tysWebserver.checkList.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.checkList.model.CheckListModel;
import tys.tysWebserver.checkList.repository.CheckListRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/checkList")
public class CheckListController {
	
	@Autowired
	CheckListRepo checkListRepo;
	
	@PostMapping("/add")
	public ResponseEntity<CheckListModel> addcheckList(@RequestBody CheckListModel checkList) {
		
		System.out.println(checkList);
		checkListRepo.save(checkList);
		return ResponseEntity.ok(checkList);
	}
	
	@GetMapping("/getpub/{id}")
	public List<CheckListModel> getAllPublished(@PathVariable String id) {
		
		int watercraftId = Integer.parseInt(id);
		List<CheckListModel> allList = checkListRepo.findByWatercraftId(watercraftId);
		List<CheckListModel> publishedList = new ArrayList<CheckListModel>();
		for(CheckListModel checkListModel : allList) {
			System.out.println(checkListModel);
			if(checkListModel.isPublish()) {
				publishedList.add(checkListModel);
			}
		}
		return publishedList;
	}
	
	@GetMapping("/get/{id}")
	public List<CheckListModel> getAllById(@PathVariable String id) {
		
		int watercraftId = Integer.parseInt(id);
		List<CheckListModel> allList = checkListRepo.findByWatercraftId(watercraftId);
		return allList;
	}

}
