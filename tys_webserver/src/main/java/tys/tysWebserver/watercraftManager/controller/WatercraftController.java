package tys.tysWebserver.watercraftManager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.watercraftManager.model.WatercraftModel;
import tys.tysWebserver.watercraftManager.repository.AddWatercraftRepo;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/watercraft")

public class WatercraftController {
	
	@Autowired
	private AddWatercraftRepo AWrepo;
	
	@PostMapping("/details")
	public WatercraftModel createWatercraft(@RequestBody WatercraftModel addwatercraft) {
		System.out.println(addwatercraft.getWatercraftName());
		return AWrepo.save(addwatercraft);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/updateWatercraftById/{id}")
	public WatercraftModel updateWatercraftById(@PathVariable String id, @RequestBody WatercraftModel addwatercraft) {
		
		WatercraftModel data = AWrepo.findById(Integer.parseInt(id)).get();
		data.setBoatClass(addwatercraft.getBoatClass());
		data.setBuilder(addwatercraft.getBuilder());
		data.setCategory(addwatercraft.getCategory());
		data.setDescription(addwatercraft.getDescription());
		data.setFuelType(addwatercraft.getFuelType());
		data.setHullType(addwatercraft.getHullType());
		data.setLength(addwatercraft.getLength());
		data.setMakeYear(addwatercraft.getMakeYear());
		data.setModel(addwatercraft.getModel());
		data.setWatercraftName(addwatercraft.getWatercraftName());
		
		return AWrepo.save(data);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllWaterCraft")
	public List<WatercraftModel> finalAll() {
		List<WatercraftModel> data = AWrepo.findAll();
		return data;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteWaterCraft/{id}")
	public ResponseEntity<String> deleteWaterCraft(@PathVariable String id) {
		System.out.println(id);
		AWrepo.deleteById(Integer.parseInt(id));
		return new ResponseEntity<String>("Success", HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getWaterCraftById/{id}")
	public WatercraftModel getWaterCraftById(@PathVariable String id) {
		System.out.println(id);
		Optional<WatercraftModel> data = AWrepo.findById(Integer.parseInt(id));
		return data.get();
	}

}