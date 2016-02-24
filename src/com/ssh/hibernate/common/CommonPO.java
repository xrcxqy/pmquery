/**
 * 
 */
package com.ssh.hibernate.common;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.ruijie.util.transform.Ext;


/**
 * @author rj
 * PO的公共类,用于公共方法的集合
 */
public abstract class CommonPO {
	
	/**
	 * 将List 转换成 JSON
	 * 一般用于Store数据填充
	 * @param list
	 * @return
	 */
	public static JSONObject parseToJsonList(List<? extends CommonPO> list) {
		return parseToJsonList(list,null);
	}
	
	/**
	 * 将List 转换成 JSON
	 * 一般用于Store数据填充
	 * @param list
	 * @return
	 */
	public static JSONObject parseToJsonList(List<? extends CommonPO> list,CommonPOConfig config) {
		JSONObject root = new JSONObject();
		root.put(Ext.ROOT, parseToJSONArray(list,config));
		return root;
	}
	
	/**
	 * 转换成JSON数组
	 * 一般用于树节点
	 * @param list
	 * @return
	 */
	public static JSONArray parseToJSONArray(List<? extends CommonPO> list) {
		return parseToJSONArray(list,null);
	}
	
	/**
	 * 转换成JSON数组
	 * 一般用于树节点
	 * @param list
	 * @return
	 */
	public static JSONArray parseToJSONArray(List<? extends CommonPO> list,CommonPOConfig config) {
		JSONArray arr = new JSONArray();
		for( CommonPO temp : list) {
			if (temp != null){
				arr.put(temp.parseToJson(null,config));
			}
		}
		return arr;
	}
	
	/**
	 * 将对象转换成JSON
	 * @return
	 */
	public JSONObject parseToJson() {
		return parseToJson(null);
	}
	
	public JSONObject parseToJson(JSONObject json){
		return parseToJson(json,null);
	} 
	
	/**
	 * @param json
	 * @return
	 */
	public abstract JSONObject parseToJson(JSONObject obj,CommonPOConfig config);
	
	
}