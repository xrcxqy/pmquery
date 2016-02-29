package com.ruijie.pm.service.pminfo;
import java.util.List;


import com.ruijie.pm.dao.pminfo.PmInfoDao;
import com.ruijie.pm.po.pminfo.PmInfo;
import com.ruijie.pm.querybean.pminfo.PmInfoQueryBean;

public class PmInfoProvider {

	private PmInfoDao pmInfoDao;
	
	/**
	 * @return
	 */
	public List<PmInfo> queryAll() {
		return pmInfoDao.queryAll();
	}

	public PmInfoDao getPmInfoDao() {
		return pmInfoDao;
	}

	public void setPmInfoDao(PmInfoDao pmInfoDao) {
		this.pmInfoDao = pmInfoDao;
	}

	public int queryByBean(PmInfoQueryBean queryBean, List<PmInfo> list) {
		// TODO Auto-generated method stub
		return 0;
	}

	
}
