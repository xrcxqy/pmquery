package com.ruijie.pm.service.pminfo;
import java.util.List;


import com.ruijie.pm.dao.pminfo.PmQuotedPriceDao;
import com.ruijie.pm.po.pminfo.PmQuotedPrice;
public class PmQuotedPriceProvider {

	private PmQuotedPriceDao pmQuotedPriceDao;
	
	/**
	 * @return
	 */
	public List<PmQuotedPrice> queryAll() {
		return pmQuotedPriceDao.queryAll();
	}

	public PmQuotedPrice queryByWorkOrder(String workOrder) {
		return pmQuotedPriceDao.queryByVariableSingle("workOrder", workOrder);
	}

	public PmQuotedPriceDao getPmQuotedPriceDao() {
		return pmQuotedPriceDao;
	}

	public void setPmQuotedPriceDao(PmQuotedPriceDao pmQuotedPriceDao) {
		this.pmQuotedPriceDao = pmQuotedPriceDao;
	}	
	
	
}
