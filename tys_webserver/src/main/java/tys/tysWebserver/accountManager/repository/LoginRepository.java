package tys.tysWebserver.accountManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.accountManager.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {

	public Login findByEmail(String email);
	
	public Login findByUsername(String username);
	
	@Query("update Login set password =?1 where id=?2")
	public void updatePassword(String password, String user);
}
