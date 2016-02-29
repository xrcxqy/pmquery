/**
 * 
 */
package com.ruijie.pm.querybean.pminfo;

import org.json.JSONObject;

import com.ruijie.pm.po.pminfo.PmInfo;
import com.ruijie.pm.querybean.PageQueryBean;

/**
 * @author rj
 */
public class PmInfoQueryBean extends PageQueryBean {
	private PmInfo pmInfo;

	/**
	 * 根据实际情况新增
	 * @return
	 */
	public JSONObject parseParams() {
  		JSONObject obj = new JSONObject();
  		if (pmInfo != null) {
			if(pmInfo.getAcceptedUser() != null){
				obj.put("queryBean.pmInfo.dealUser", pmInfo.getAcceptedUser());
			}
  			
		}
		return obj;
	}

}
