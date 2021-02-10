package tys.tysWebserver.watercraftManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import tys.tysWebserver.watercraftManager.model.AddWatercraftModel;
import tys.tysWebserver.watercraftManager.repository.AddWatercraftRepo;

public class AddWatercraftController {
	
	@Autowired
	private AddWatercraftRepo AWrepo;
	
	@PostMapping("/watercraft")
	public AddWatercraftModel createWatercraft(@RequestBody AddWatercraftModel addwatercraft) {
		return AWrepo.save(addwatercraft);
		
	}

}
