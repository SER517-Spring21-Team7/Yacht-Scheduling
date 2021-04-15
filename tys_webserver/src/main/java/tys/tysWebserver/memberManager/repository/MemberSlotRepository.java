package tys.tysWebserver.memberManager.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.memberManager.model.MemberSlot;

@Repository
public interface MemberSlotRepository extends JpaRepository<MemberSlot, Integer> {
	
	List<MemberSlot> findByMemberId(Integer id);

}
