package com.ruijie.base.po.userconfig;

import org.json.JSONObject;
import com.ssh.hibernate.common.CommonPO;
import com.ssh.hibernate.common.CommonPOConfig;


/**
 * UserInfo entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class UserInfo extends CommonPO {

	// Fields

	private Integer id;
	private String name;
	private String email;

	/** default constructor */
	public UserInfo() {
	}

	public UserInfo(Integer id) {
		super();
		this.id = id;
	}
	
	/** full constructor */
	public UserInfo(String name, String email, String casSsoId) {
		this.name = name;
		this.email = email;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		String str=this.getId()+ this.getName();
		return str;
	}

	@Override
	public JSONObject parseToJson(JSONObject obj, CommonPOConfig config) {
		if (obj == null) {
			obj = new JSONObject();
		}
		obj.put("id", id);
		obj.put("value", name);
		obj.put("userName", name);
		if (config != null) {
			if (config.getParseToJsonAll()) {
				obj.put("email", email);
			}
		}
		return obj;
	}
}