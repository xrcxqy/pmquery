package com.ruijie.base.action.userconfig;

import org.json.JSONObject;

import com.ruijie.base.service.main.MainProvider;
import com.ssh.struts.helper.MyActionSupport;

@SuppressWarnings("serial")
public class UserInfoAction extends MyActionSupport {
	private String type;
	@SuppressWarnings("unused")
	private MainProvider mainProvider;
	
	@Override
	public String execute() throws Exception {
		JSONObject result = new JSONObject();
		autoResponse(result);
		return null;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public void setMainProvider(MainProvider mainProvider) {
		this.mainProvider = mainProvider;
	}
	
	
}
