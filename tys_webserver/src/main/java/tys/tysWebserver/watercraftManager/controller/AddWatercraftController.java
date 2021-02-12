package tys.tysWebserver.watercraftManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.watercraftManager.model.WatercraftModel;
import tys.tysWebserver.watercraftManager.repository.AddWatercraftRepo;

@RestController
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
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/deleteWaterCraft/{id}")
	public ResponseEntity<String> deleteWaterCraft(@PathVariable String id) {
		System.out.println(id);
		AWrepo.deleteById(Integer.parseInt(id));
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}

}
