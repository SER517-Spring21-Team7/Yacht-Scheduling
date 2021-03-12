package tys.tysWebserver.memberManager.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import tys.tysWebserver.memberManager.model.MemberModel;

public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

	@PersistenceContext
    private EntityManager em;

}
