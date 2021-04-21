package tys.tysWebserver.accountManager.model;

public class PasswordUpdate {

	String currentPassword;
	String newPassword;
	Boolean showPassword;

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public Boolean getShowPassword() {
		return showPassword;
	}

	public void setShowPassword(Boolean showPassword) {
		this.showPassword = showPassword;
	}
	
	
}
