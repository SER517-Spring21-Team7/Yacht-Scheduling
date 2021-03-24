package tys.tysWebserver.memberManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import tys.tysWebserver.memberManager.model.MemberModel;

@Repository
public interface MemberRepository extends JpaRepository<MemberModel, Integer>, MemberRepositoryCustom{
		
	@Transactional
	List<MemberModel> findByFirstnameIgnoreCaseContaining(String name);
	
	List<MemberModel> findAllByMemberId(Integer id);
}