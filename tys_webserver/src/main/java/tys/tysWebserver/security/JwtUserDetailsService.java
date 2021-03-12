package tys.tysWebserver.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import tys.tysWebserver.accountManager.model.Login;
import tys.tysWebserver.accountManager.repository.LoginRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	LoginRepository loginRepository;
	
	@Override
	public Login loadUserByUsername(String username) throws UsernameNotFoundException 
	{
//		if ("admin".equals(username)) 
//		{
//			return new User("admin", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
//					new ArrayList<>());
//		} else {
			
		Login user = loginRepository.findByUsername(username);
		if(user != null) {
			System.out.println(user.getUsername() +" -- "+ user.getPassword	());
			return user;
		}
		else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}