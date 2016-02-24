package com.ruijie.util.transform;

/**
 * 
 */
import org.json.JSONObject;

/**
 * @author LGF
 * @Description 用于前台界面接收处理结果通用字符串
 */
public class Ext {
	
	/**
	 * @Description 是否成功标识串 : success
	 */
	public static final String SUCCESS = "success";
	
	/**   
	 * @Description 用于Ajax 出错时候提示信息 : msg 
	 */
	public static final String MESSAGE = "msg";
	
	/** 
	 * @Description Store中配置的默认Root值： root
	 */
	public static final String ROOT = "root";
	
	/**
	 * @Description Store中配置的默认totalCount值：totalCount<br/>
	 *              用于分页 
	 */
	public static final String TOTALCOUNT = "totalCount";
	
	/**
	 * @Description Store中常用的字符串ID: id
	 */
	public static final String ID = "id";
	
	/**
	 * @Description Store中常用的字符串VALUE: value
	 */
	public static final String VALUE = "value";

	/**
	 * @Description 系统处理出错,或则请求失败<br/>
	 * 				success 为 false <br/>
	 * 				meg : 具体错误信息 <br/>
	 * 				默认错误信息支持累加<br/>
	 * 
	 * 			    setErrorResult(result,msg,false);
	 * 
	 * @param result 需要进行错误赋值的JSONObject
	 * @param msg 错误信息
	 * 
	 * @see Ext#setErrorResult(JSONObject result,String msg,boolean overridemsg)
	 */
	public static void setErrorResult(JSONObject result,String msg){
		setErrorResult(result,msg,false);
	}
	
	/**
	 * @Description 错误信息默认初始化方法
	 * @see Ext#setErrorResult(JSONObject result,String msg)
	 * @param result 
	 * @param msg
	 * @param overridemsg 是否需要覆盖msg
	 * @return 
	 */
	public static void setErrorResult(JSONObject result,String msg,boolean overridemsg){
		result.put(Ext.SUCCESS, Boolean.FALSE);
		if (!StringUtil.notNullORempty(msg)) {
			msg = "系统故障,请联系管理员处理";
		}
		if(overridemsg){
			result.put(Ext.MESSAGE, msg);
		}else{
			setMessage(result,msg);
		}
		
	}
	
	/**
	 * @Description 请求成功,返回前台信息
	 * @param result
	 * @param msg
	 */
	public static void setMessage(JSONObject result,String msg){
		if(result.has(Ext.MESSAGE)){
			result.put(Ext.MESSAGE, result.get(Ext.MESSAGE) + "<br/>" + msg);
		}else{
			result.put(Ext.MESSAGE, msg);
		}
	}

	/**
	 * @Description JSON中如果包含是否SUCCESS,并且不为False<br/>
	 * 				1. result 为空,返回TRUE<br/>
	 * 				2. reuslt 不包含success 返回TRUE<br/>
	 * 				3. 根据实际情况返回
	 * @param result
	 * @return
	 */
	public static boolean successNotFalse(JSONObject result) {
		if (result == null) {
			return Boolean.TRUE;
		}
		if (result.has(Ext.SUCCESS)) {
			return result.getBoolean(Ext.SUCCESS);
		}
		return Boolean.TRUE;
	}
}
