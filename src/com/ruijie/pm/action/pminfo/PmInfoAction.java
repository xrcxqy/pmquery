package com.ruijie.pm.action.pminfo;

import java.util.List;

import org.json.JSONObject;

import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.pm.po.pminfo.PmInfo;
import com.ruijie.pm.service.pminfo.PmInfoProvider;
import com.ssh.struts.helper.MyActionSupport;

@SuppressWarnings("serial")
public class PmInfoAction extends MyActionSupport {
	private String type;
	private PmInfoProvider pmInfoProvider;
	@Override
	public String execute() throws Exception {
		//UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("user");
		
		JSONObject result = new JSONObject();
		
		System.out.println("type: " + type);
		if (QUERY_TYPE_ALL.equals(type)) {
			List<PmInfo> list = pmInfoProvider.queryAll();
			result = UserInfo.parseToJsonList(list);
		}
		autoResponse(result);
		return null;
	}

	public void setPmInfoProvider(PmInfoProvider pmInfoProvider) {
		this.pmInfoProvider = pmInfoProvider;
	}

	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
}
