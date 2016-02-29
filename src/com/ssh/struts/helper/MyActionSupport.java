package com.ssh.struts.helper;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;
import com.ruijie.util.transform.Ext;

@SuppressWarnings("serial")
public class MyActionSupport extends ActionSupport {
	/**
	 * 默认属性
	 */
	public String type;
	
	protected final String QUERY_TYPE_ALL = "QUERY_ALL";
	/**
	 * 获得request
	 * 
	 * @return
	 */
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * 获得response
	 * 
	 * @return
	 */
	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 获得session
	 * 
	 * @return
	 */
	public HttpSession getSession() {
		return getRequest().getSession();
	}

	/**
	 * 获得servlet上下文
	 * 
	 * @return
	 */
	public ServletContext getServletContext() {
		return ServletActionContext.getServletContext();
	}

	public String getRealyPath(String path) {
		return getServletContext().getRealPath(path);
	}
	
	/**
	 * @Description : 默认的json返回结果
	 * @param result
	 * @throws IOException 
	 */
	public void autoResponse(JSONObject result) throws IOException{
		if (result!= null) {
			if (!result.has(Ext.SUCCESS)) {
				result.put(Ext.SUCCESS, Boolean.TRUE);
			}
			ServletActionContext.getResponse().getWriter().print(result.toString());
		}
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public void addActionError(String anErrorMessage) {
		System.out.println("addActionError ：" + anErrorMessage);
		super.addActionError(anErrorMessage);
	}
	@Override
	public void addActionMessage(String message) {
		System.out.println("addActionMessage ：" + message);
		super.addActionMessage(message);
	}
	@Override
	public void addFieldError(String fieldName, String errorMessage) {
		System.out.println("fieldName ：" + fieldName);
		System.out.println("errorMessage ：" + errorMessage);
		super.addFieldError(fieldName, errorMessage);
	}
	
}
