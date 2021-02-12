package tys.tysWebserver.watercraftManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.watercraftManager.model.AddWatercraftModel;
import tys.tysWebserver.watercraftManager.repository.AddWatercraftRepo;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/watercraft")

public class AddWatercraftController {
	
	@Autowired
	private AddWatercraftRepo AWrepo;
	
	@PostMapping("/details")
	public AddWatercraftModel createWatercraft(@RequestBody AddWatercraftModel addwatercraft) {
		System.out.println(addwatercraft.toString());
		
		return AWrepo.save(addwatercraft);
		
	}

}
