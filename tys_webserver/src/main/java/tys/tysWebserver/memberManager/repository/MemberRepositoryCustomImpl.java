package tys.tysWebserver.memberManager.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

	@PersistenceContext
    private EntityManager em;

}
