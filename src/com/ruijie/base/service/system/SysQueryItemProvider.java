/**
 * 
 */
package com.ruijie.base.service.system;
import java.util.List;

import com.ruijie.base.dao.system.SysQueryItemDao;
import com.ruijie.base.po.system.SysQueryItem;

/**
 * @author rj
 *
 */
public class SysQueryItemProvider {
	private SysQueryItemDao sysQueryItemDao;

	public List<SysQueryItem> queryAll() {
		return sysQueryItemDao.queryAll();
	}
	
	public List<SysQueryItem> queryBySelected(Boolean selected) {
		return sysQueryItemDao.queryBySelected(selected);
	} 
	
	public SysQueryItemDao getSysQueryItemDao() {
		return sysQueryItemDao;
	}
	public void setSysQueryItemDao(SysQueryItemDao sysQueryItemDao) {
		this.sysQueryItemDao = sysQueryItemDao;
	}

	
	/**
	 * 根据ID来获得行信息
	 * @param queryHeader
	 * @return
	 */
	   
	public List<SysQueryItem> getByids(String ids) {
		return sysQueryItemDao.getByids(ids);
	}

	/**
	 * 根据ID来获得为选择行信息
	 * @param searchDefaultQueryItem
	 * @return
	 */
	public List<SysQueryItem> getByidsNotIn(String ids) {
		return sysQueryItemDao.getByidsNotIn(ids);
	}
	
	
}
