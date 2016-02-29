package com.ruijie.pm.po.pminfo;

import java.util.Date;

import org.json.JSONObject;

import com.ruijie.util.transform.DateUtil;
import com.ssh.hibernate.common.CommonPO;
import com.ssh.hibernate.common.CommonPOConfig;


/**
 * UserInfo entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class PmInfo extends CommonPO {
	// Fields
	private Integer id;
	private Date dealDate;
	private String dealUser;

	/** default constructor */
	public PmInfo() {
	}

	public PmInfo(Integer id) {
		super();
		this.id = id;
	}
	

	// Property accessors

	public Date getDealDate() {
		return dealDate;
	}

	public void setDealDate(Date dealDate) {
		this.dealDate = dealDate;
	}

	public String getDealUser() {
		return dealUser;
	}

	public void setDealUser(String dealUser) {
		this.dealUser = dealUser;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}



	@Override
	public String toString() {
		String str=this.getId().toString();
		return str;
	}

	@Override
	public JSONObject parseToJson(JSONObject obj, CommonPOConfig config) {
		if (obj == null) {
			obj = new JSONObject();
		}
		obj.put("id", id);
		obj.put("dealUser", this.dealUser);
		obj.put("dealDate", DateUtil.getDateFormat(this.dealDate));
		return obj;
	}
}