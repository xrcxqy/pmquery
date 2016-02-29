/**
 * 
 */
package com.ruijie.base.dao.system;
import java.util.ArrayList;
import java.util.List;

import com.ruijie.base.po.system.SysQueryItem;
import com.ssh.hibernate.common.CommonDao;

/**
 * @author rj
 *
 */
public class SysQueryItemDao extends CommonDao<SysQueryItem,Integer>{

	/**
	 * @author ; rj
	 * @Description : TODO
	 * @CreateDate ; Feb 19, 2014 10:36:20 AM
	 * @lastModified ; Feb 19, 2014 10:36:20 AM
	 * @version ; 1.0
	 * @param selected
	 * @return
	 */
	public List<SysQueryItem> queryBySelected(Boolean selected) {
		return queryByVariable("selected", selected,"showOrder",null);
	}

	
	/**
	 * 根据IDs进行排序,并且查询结果根据In中的数据排序
	 * @param ids
	 * @return
	 */
	   
	@SuppressWarnings("unchecked")
	public List<SysQueryItem> getByids(String ids) {
		if (ids == null) {
			return new ArrayList<SysQueryItem>();
		}
		String sql = "from SysQueryItem as qi where qi.id in (" + ids + ") order by charindex(','+ltrim(qi.id)+',','," + ids +",')";
		return hibernateTemplate.find(sql);
	}


	/**
	 * @param ids
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<SysQueryItem> getByidsNotIn(String ids) {
		if (ids == null) {
			return new ArrayList<SysQueryItem>();
		}
		String sql = "from SysQueryItem as qi where qi.id not in (" + ids + ") order by header";
		return hibernateTemplate.find(sql);
	}

}
