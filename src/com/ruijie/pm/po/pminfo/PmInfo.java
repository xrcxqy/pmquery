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
	private Date   acceptedDate;
	private String acceptedUser;
	private String manualWorkOrder;
	private String workOrder;
	
	private String customerCategory;
	private String repairUnit;
	private String customerName;
	private String customerPhone;
	private String customerOtherPhone;
	
	private Date   buyDate;
	private String productBrand;
	private String productName;
	private String IMEI;
	private String isInWarranty;
	
	private String productFaultType;
	private String faultDescription;
	private String faultPhenomenon;
	private String serviceMode;
	private String serviceDescription;
	
	private String newIMEI;
	private String replacePartName;
	private String reasonForService;
	private String serviceRemark;
	private Date   pickPhoneDate;
	
	private String pickPhoneRemark;
	private String acceptedReviewer;
	private String serviceReviewer;
	private Integer quotedPrice;
	
	/** default constructor */
	public PmInfo() {
	}

	public PmInfo(Integer id) {
		super();
		this.id = id;
	}
	

	// Property accessors

	public Date getAcceptedDate() {
		return acceptedDate;
	}

	public void setAcceptedDate(Date acceptedDate) {
		this.acceptedDate = acceptedDate;
	}

	public String getAcceptedUser() {
		return acceptedUser;
	}

	public void setAcceptedUser(String acceptedUser) {
		this.acceptedUser = acceptedUser;
	}

	public String getManualWorkOrder() {
		return manualWorkOrder;
	}

	public void setManualWorkOrder(String manualWorkOrder) {
		this.manualWorkOrder = manualWorkOrder;
	}

	public String getWorkOrder() {
		return workOrder;
	}

	public void setWorkOrder(String workOrder) {
		this.workOrder = workOrder;
	}

	public String getCustomerCategory() {
		return customerCategory;
	}

	public void setCustomerCategory(String customerCategory) {
		this.customerCategory = customerCategory;
	}

	public String getRepairUnit() {
		return repairUnit;
	}

	public void setRepairUnit(String repairUnit) {
		this.repairUnit = repairUnit;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	public String getCustomerOtherPhone() {
		return customerOtherPhone;
	}

	public void setCustomerOtherPhone(String customerOtherPhone) {
		this.customerOtherPhone = customerOtherPhone;
	}

	public Date getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}

	public String getProductBrand() {
		return productBrand;
	}

	public void setProductBrand(String productBrand) {
		this.productBrand = productBrand;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getIMEI() {
		return IMEI;
	}

	public void setIMEI(String iMEI) {
		IMEI = iMEI;
	}

	public String getIsInWarranty() {
		return isInWarranty;
	}

	public void setIsInWarranty(String isInWarranty) {
		this.isInWarranty = isInWarranty;
	}

	public String getProductFaultType() {
		return productFaultType;
	}

	public void setProductFaultType(String productFaultType) {
		this.productFaultType = productFaultType;
	}

	public String getFaultDescription() {
		return faultDescription;
	}

	public void setFaultDescription(String faultDescription) {
		this.faultDescription = faultDescription;
	}

	public String getFaultPhenomenon() {
		return faultPhenomenon;
	}

	public void setFaultPhenomenon(String faultPhenomenon) {
		this.faultPhenomenon = faultPhenomenon;
	}

	public String getServiceMode() {
		return serviceMode;
	}

	public void setServiceMode(String serviceMode) {
		this.serviceMode = serviceMode;
	}

	public String getServiceDescription() {
		return serviceDescription;
	}

	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}

	public String getNewIMEI() {
		return newIMEI;
	}

	public void setNewIMEI(String newIMEI) {
		this.newIMEI = newIMEI;
	}

	public String getReplacePartName() {
		return replacePartName;
	}

	public void setReplacePartName(String replacePartName) {
		this.replacePartName = replacePartName;
	}

	public String getReasonForService() {
		return reasonForService;
	}

	public void setReasonForService(String reasonForService) {
		this.reasonForService = reasonForService;
	}

	public String getServiceRemark() {
		return serviceRemark;
	}

	public void setServiceRemark(String serviceRemark) {
		this.serviceRemark = serviceRemark;
	}

	public Date getPickPhoneDate() {
		return pickPhoneDate;
	}

	public void setPickPhoneDate(Date pickPhoneDate) {
		this.pickPhoneDate = pickPhoneDate;
	}

	public String getPickPhoneRemark() {
		return pickPhoneRemark;
	}

	public void setPickPhoneRemark(String pickPhoneRemark) {
		this.pickPhoneRemark = pickPhoneRemark;
	}

	public String getAcceptedReviewer() {
		return acceptedReviewer;
	}

	public void setAcceptedReviewer(String acceptedReviewer) {
		this.acceptedReviewer = acceptedReviewer;
	}

	public String getServiceReviewer() {
		return serviceReviewer;
	}

	public void setServiceReviewer(String serviceReviewer) {
		this.serviceReviewer = serviceReviewer;
	}

	public Integer getQuotedPrice() {
		return quotedPrice;
	}

	public void setQuotedPrice(Integer quotedPrice) {
		this.quotedPrice = quotedPrice;
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
		obj.put("acceptedUser", 		this.acceptedUser);
		obj.put("acceptedDate", 		DateUtil.getDateFormat(this.acceptedDate));
		obj.put("manualWorkOrder", 		this.manualWorkOrder);
		obj.put("workOrder", 			this.workOrder);
		
		obj.put("customerCategory", 	this.customerCategory);
		obj.put("repairUnit", 			this.repairUnit);
		obj.put("customerName", 		this.customerName);
		obj.put("customerPhone", 		this.customerPhone);
		obj.put("customerOtherPhone", 	this.customerOtherPhone);
		
		obj.put("buyDate", 				DateUtil.getDateFormat(this.buyDate));
		obj.put("productBrand", 		this.productBrand);
		obj.put("productName", 			this.productName);
		obj.put("IMEI", 				this.IMEI);
		obj.put("isInWarranty", 		this.isInWarranty);
		
		obj.put("productFaultType", 	this.productFaultType);
		obj.put("faultDescription", 	this.faultDescription);
		obj.put("faultPhenomenon", 		this.faultPhenomenon);
		obj.put("serviceMode", 			this.serviceMode);
		obj.put("serviceDescription", 	this.serviceDescription);
		
		obj.put("newIMEI", 				this.newIMEI);
		obj.put("replacePartName", 		this.replacePartName);
		obj.put("reasonForService", 	this.reasonForService);
		obj.put("serviceRemark", 		this.serviceRemark);
		obj.put("pickPhoneDate",  		DateUtil.getDateFormat(this.pickPhoneDate));
		
		obj.put("pickPhoneRemark", 		this.pickPhoneRemark);
		obj.put("acceptedReviewer", 	this.acceptedReviewer);
		obj.put("serviceReviewer", 		this.serviceReviewer);
		obj.put("quotedPrice", 			this.quotedPrice);
		return obj;
		
	}
}