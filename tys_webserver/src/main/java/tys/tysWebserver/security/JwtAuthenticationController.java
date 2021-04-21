package tys.tysWebserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import tys.tysWebserver.accountManager.model.JwtRequest;
import tys.tysWebserver.accountManager.model.JwtResponse;
import tys.tysWebserver.accountManager.model.Login;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception 
	{
//		authenticate(authenticationRequest.getUsername(), 
		//authenticationRequest.getPassword());
		
		PasswordEncoder pas = new BCryptPasswordEncoder();
	
		final Login userDetails = 
		userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		System.out.println(pas.encode("sarang") + "--> encoded pass");
		System.out.println(authenticationRequest.getPassword()+"--> user typed pass");
		System.out.println(userDetails.getPassword()+"--> db read pass");
		System.out.println(pas.matches(authenticationRequest.getPassword(),userDetails.getPassword()));
		if(pas.matches(authenticationRequest.getPassword(), userDetails.getPassword())) {
			final String token = jwtTokenUtil.generateToken(userDetails);
			System.out.println(userDetails.getId());
			return ResponseEntity.ok(new JwtResponse(token, userDetails.getRole(), userDetails.getId()));
		}
		else {
			System.out.println("Not matching Passwords");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
	
//	private void authenticate(String username, String password) throws Exception {
//		try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//		} catch (DisabledException e) {
//			throw new Exception("USER_DISABLED", e);
//		} catch (BadCredentialsException e) {
//			throw new Exception("INVALID_CREDENTIALS", e);
//		}
//	}