package tys.tysWebserver.accountManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tys.tysWebserver.accountManager.model.Login;
import tys.tysWebserver.accountManager.repository.LoginRepository;

@Controller
public class LoginController {
	
	@Autowired
	LoginRepository loginRepo;

	
	@GetMapping("/login")
	public ResponseEntity<Boolean> checkCredentials(@RequestParam Login credentials) {
		
		Login user = loginRepo.findByEmail(credentials.getEmail());
		
		if(user.getPassword().equals(credentials.getPassword())) {
			return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
		}
		else
			return new ResponseEntity<>(Boolean.FALSE, HttpStatus.OK);

		
	}
}
