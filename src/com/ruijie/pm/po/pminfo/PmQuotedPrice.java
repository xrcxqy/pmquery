package com.ruijie.pm.po.pminfo;

import java.util.Date;

import org.json.JSONObject;

import com.ruijie.util.transform.DateUtil;
import com.ssh.hibernate.common.CommonPO;
import com.ssh.hibernate.common.CommonPOConfig;

public class PmQuotedPrice extends CommonPO{

	private Integer id;
	private String offer ;		// 报价人
	private Date offerTime;  	// 报价时间
	private String workOrder;
	private Integer cost;
	private String verifyResult;
	private String serviceDescription;
	private Integer receiptNumber;
	
	
	
	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getOffer() {
		return offer;
	}



	public void setOffer(String offer) {
		this.offer = offer;
	}



	public Date getOfferTime() {
		return offerTime;
	}



	public void setOfferTime(Date offerTime) {
		this.offerTime = offerTime;
	}



	public String getWorkOrder() {
		return workOrder;
	}



	public void setWorkOrder(String workOrder) {
		this.workOrder = workOrder;
	}



	public Integer getCost() {
		return cost;
	}



	public void setCost(Integer cost) {
		this.cost = cost;
	}



	public String getVerifyResult() {
		return verifyResult;
	}



	public void setVerifyResult(String verifyResult) {
		this.verifyResult = verifyResult;
	}



	public String getServiceDescription() {
		return serviceDescription;
	}



	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}



	public Integer getReceiptNumber() {
		return receiptNumber;
	}



	public void setReceiptNumber(Integer receiptNumber) {
		this.receiptNumber = receiptNumber;
	}



	@Override
	public JSONObject parseToJson(JSONObject obj, CommonPOConfig config) {
		if (obj == null){
			obj = new JSONObject();
		}
		obj.put("offer", offer);
		obj.put("offerTime", DateUtil.getDateFormat(this.offerTime));
		obj.put("workOrder", workOrder);
		obj.put("cost", cost);
		obj.put("verifyResult", verifyResult);
		obj.put("serviceDescription", serviceDescription);
		obj.put("receiptNumber", receiptNumber);
	
		return obj;
	}

}
