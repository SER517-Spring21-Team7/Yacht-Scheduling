package tys.tysWebserver.accountManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.accountManager.model.Login;
import tys.tysWebserver.accountManager.repository.LoginRepository;

@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	LoginRepository loginRepo;

	@PostMapping("/admin")
	public ResponseEntity<Boolean> checkCredentials(@RequestBody Login credentials) {
		System.out.println(credentials.getEmail());
		System.out.println(credentials.getPassword());
//		Login user = loginRepo.findByEmail(credentials.getEmail());
//		
//		if(user.getPassword().equals(credentials.getPassword())) {
//			return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
//		}
//		else
			return new ResponseEntity<>(Boolean.FALSE, HttpStatus.OK);
	}
	
	public void createCredentials(int userId, String email, String password, String role) {
		Login newLogin = new Login(userId, email, password, role);
		loginRepo.save(newLogin);
	}
}