package com.ruijie.base.service.userconfig;
import java.util.List;

import org.json.JSONObject;

import com.ruijie.base.dao.userconfig.UserInfoDao;
import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.util.transform.Ext;

public class UserInfoProvider {

	private UserInfoDao userInfoDao;
	
	/**
	 * @version ; 1.0
	 * @param loginName
	 * @return
	 */
	public UserInfo getUserByExternalID(String loginName) {
		return userInfoDao.getUserByExternalID(loginName);
	}
	
	/**
	 * @return
	 */
	   
	public List<UserInfo> queryAll() {
		return userInfoDao.queryAll();
	}

	public JSONObject save(UserInfo userInfo) {
		JSONObject result = new JSONObject();
		if (userInfo == null) {
			Ext.setErrorResult(result, "未识别到用户");
			return result;
		}
		
		if (userInfo.getName() == null) {
			Ext.setErrorResult(result, "用户名不能为空");
			return result;
		}
		
		userInfoDao.save(userInfo);
		result.put("user", userInfo.parseToJson(null,null));
		
		return result;
	}
	
	
	/********************************* get 和 set 方法 *********************************/
	public UserInfoDao getUserInfoDao() {
		return userInfoDao;
	}

	public void setUserInfoDao(UserInfoDao userInfoDao) {
		this.userInfoDao = userInfoDao;
	}
}
