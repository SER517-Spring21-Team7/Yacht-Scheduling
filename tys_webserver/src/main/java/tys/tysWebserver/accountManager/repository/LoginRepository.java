package tys.tysWebserver.accountManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.accountManager.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

	public Login findByEmail(String email);
	
	
}
