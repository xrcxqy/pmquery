package com.ssh.hibernate.common;

import com.ruijie.util.transform.DateUtil;

public class CommonPOConfig {
	/**
	 *  是否全部转换
	 */
	private boolean parseToJsonAll;

	/**
	 *  指定时间格式化格式
	 */
	private String dateFormat;
	
	/**
	 * 一般用于转换全部数据的构造函数
	 * @param parseToJsonAll
	 */
	public CommonPOConfig(boolean parseToJsonAll){
		this();
		this.parseToJsonAll = parseToJsonAll;
		
	}
	
	/**
	 * 默认初始化时间
	 */
	public CommonPOConfig() {
		dateFormat = DateUtil.ACCURATE_TO_DAY_EN;
	}
	
	public boolean getParseToJsonAll() {
		return parseToJsonAll;
	}
	

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public void setParseToJsonAll(boolean parseToJsonAll) {
		this.parseToJsonAll = parseToJsonAll;
	}
	
	public static void main(String[] args) {
		CommonPOConfig p = new CommonPOConfig();
		System.out.println(p.getDateFormat());
	}
	
}
