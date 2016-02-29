package com.ruijie.base.action.userconfig;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;
import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.base.service.userconfig.UserConfigProvider;
import com.ruijie.base.service.userconfig.UserInfoProvider;
import com.ruijie.util.container.Tree;
import com.ruijie.util.transform.TreeUtil;
import com.ssh.struts.helper.MyActionSupport;

@SuppressWarnings("serial")
public class UserInfoAction extends MyActionSupport {
	private String type;
	private UserInfoProvider userInfoProvider;
	private UserConfigProvider userConfigProvider;
	@Override
	public String execute() throws Exception {
		UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("user");
		
		JSONObject result = new JSONObject();
		
		System.out.println("type: " + type);
		if (QUERY_TYPE_ALL.equals(type)) {
			List<UserInfo> list = userInfoProvider.queryAll();
			result = UserInfo.parseToJsonList(list);
		}else if("userOPTree".equals(type)){
			Integer pid = Integer.valueOf(getRequest().getParameter("node"));
			List<Tree> treeList = userConfigProvider.getUserOperateTreeByPid(pid, user);
			JSONArray array = TreeUtil.parseJSONArray(treeList);
			getResponse().getWriter().print(array.toString());
			return null;
		}
		autoResponse(result);
		return null;
	}
	
	public void setUserConfigProvider(UserConfigProvider userConfigProvider) {
		this.userConfigProvider = userConfigProvider;
	}

	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public UserInfoProvider getUserInfoProvider() {
		return userInfoProvider;
	}

	public void setUserInfoProvider(UserInfoProvider userInfoProvider) {
		this.userInfoProvider = userInfoProvider;
	}

	
}
