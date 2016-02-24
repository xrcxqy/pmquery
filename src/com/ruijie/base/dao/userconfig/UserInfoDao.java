package com.ruijie.base.dao.userconfig;

import java.util.List;

import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.util.transform.StringUtil;
import com.ssh.hibernate.common.CommonDao;
public class UserInfoDao extends CommonDao<UserInfo,Integer> {
	/**
	 * 根据单点登入查询
	 * @param userId
	 * @return
	 */
	public UserInfo getUserByExternalID(String userId){
		if (!StringUtil.notNullORempty(userId)) {
			return null;
		}
		List<UserInfo> list = queryByVariable("casSsoId", userId);
		if (list != null && list.size() == 1) {
			return list.get(0);
		}else{
			return null;
		}
	}
}
