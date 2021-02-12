package tys.tysWebserver.watercraftManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
=======
>>>>>>> develop
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.watercraftManager.model.WatercraftModel;
import tys.tysWebserver.watercraftManager.repository.AddWatercraftRepo;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/watercraft")

public class AddWatercraftController {
	
	@Autowired
	private AddWatercraftRepo AWrepo;
	
	@PostMapping("/details")
	public WatercraftModel createWatercraft(@RequestBody WatercraftModel addwatercraft) {
		System.out.println(addwatercraft.getWatercraftName());
		return AWrepo.save(addwatercraft);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllWaterCraft")
	public List<WatercraftModel> finalAll() {
		List<WatercraftModel> data = AWrepo.findAll();
		return data;
	}

}
