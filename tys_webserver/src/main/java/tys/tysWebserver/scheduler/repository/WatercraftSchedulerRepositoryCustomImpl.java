package tys.tysWebserver.scheduler.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class WatercraftSchedulerRepositoryCustomImpl implements WatercraftSchedulerRepositoryCustom {
	
	@PersistenceContext
    private EntityManager em;

}
