package tys.tysWebserver.memberManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.memberManager.model.MemberModel;

@Repository
public interface AddMemberRepo extends JpaRepository<MemberModel, Integer>{
	
}