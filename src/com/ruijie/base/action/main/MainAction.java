package com.ruijie.base.action.main;

import com.ruijie.base.service.main.MainProvider;
import com.ssh.struts.helper.MyActionSupport;

@SuppressWarnings("serial")
public class MainAction extends MyActionSupport {
	private String type;
	@SuppressWarnings("unused")
	private MainProvider mainProvider;
	
	@Override
	public String execute() throws Exception {
		//UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("user");
		
		// 用户基本信息初始化
		//getRequest().setAttribute("userMenuTreeTitle", "欢迎:" + user.getName());
		return SUCCESS;
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
