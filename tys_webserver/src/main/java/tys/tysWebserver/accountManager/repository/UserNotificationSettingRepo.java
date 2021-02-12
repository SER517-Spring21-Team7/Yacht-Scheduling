package tys.tysWebserver.accountManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.accountManager.model.UserNotificationSetting;

@Repository
public interface UserNotificationSettingRepo extends JpaRepository<UserNotificationSetting, Integer> {

}
