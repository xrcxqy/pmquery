/**
 * 
 */
package com.ruijie.base.action.system;
import java.util.List;
import org.json.JSONObject;
import com.ruijie.base.po.system.SysQueryItem;
import com.ruijie.base.service.system.SysQueryItemProvider;
import com.ssh.struts.helper.MyActionSupport;

/**
 * @author rj
 *
 */
@SuppressWarnings("serial")
public class SysQueryItemAction extends MyActionSupport{
	private SysQueryItemProvider sysQueryItemProvider;
	//private UserSettingProvider userSettingProvider;
	private String type;
	private boolean selected;
	public String execute() throws Exception {
		//UserInfo user = (UserInfo) ActionContext.getContext().getSession().get("user");
		//UserSetting userSetting = (UserSetting) ActionContext.getContext().getSession().get("userSetting");
		JSONObject result = new JSONObject();
		if("queryForGrid".equals(type)){
			List<SysQueryItem> queryItem = null;
			//queryItem = sysQueryItemProvider.queryAll();
			queryItem = sysQueryItemProvider.queryBySelected(selected);
//			if (selected) {
//				queryItem = sysQueryItemProvider.getByids(userSetting.getSearchDefaultQueryItem());
//			}else{
//				queryItem = sysQueryItemProvider.getByidsNotIn(userSetting.getSearchDefaultQueryItem());
//			}
			result = SysQueryItem.parseToJsonList(queryItem);
		}
		autoResponse(result);
		return null;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public void setSysQueryItemProvider(SysQueryItemProvider sysQueryItemProvider) {
		this.sysQueryItemProvider = sysQueryItemProvider;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
}
