package com.ssh.hibernate.common;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;

import com.ruijie.util.transform.StringUtil;

public class CommonQueryBean {
	private int limit;
	private int start;
	private String sort;
	private String dir;
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}

	/**
	 * @param criteria 
	 * @Description : 通用的分页设置,<br/>
	 * 可以把默认排序信息存放到QueryBean的构造函数中<br/>
	 */
	public void setCriteria(Criteria criteria){
		criteria.setProjection(null);
		criteria.setResultTransformer(Criteria.ROOT_ENTITY);
		// 分页的实现
		if(this.getLimit()>0){
			criteria.setFirstResult(this.getStart()+1);
			criteria.setMaxResults(this.getLimit());
		}
		// 设置排序
		if (StringUtil.notNullORempty(this.getSort())) {
			// 有设置排序,则按照排序,如果没有,则按照默认的排序
			if (StringUtil.notNullORempty(this.getDir())) {
				if ("desc".equalsIgnoreCase(this.getDir())) {
					criteria.addOrder(Order.desc(StringUtil.parseOrder(this.getSort())));
				}else{
					criteria.addOrder(Order.asc(StringUtil.parseOrder(this.getSort())));
				}
			}else{
				criteria.addOrder(Order.asc(StringUtil.parseOrder(this.getSort())));
			}
		}
	}
	
	public boolean intToBoolean(Integer intValue){
		if(intValue != null && intValue != 0){
			return true;
		}
		return false;
		
	}
}
