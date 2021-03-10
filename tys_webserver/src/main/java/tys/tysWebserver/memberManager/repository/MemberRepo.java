package tys.tysWebserver.memberManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.memberManager.model.MemberModel;

@Repository
public interface MemberRepo extends JpaRepository<MemberModel, Integer>{
	
	List<MemberModel> search(String terms);
}