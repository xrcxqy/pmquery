/**
 * 
 */
package com.ruijie.util.container;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.ruijie.util.transform.Ext;

/**
 * @author rj
 *
 */
public class ComboboxValue {
	private Integer id;
	private String value;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	/**
	 * @param list
	 * @return
	 */
	public static JSONObject parseToJsonList(List<ComboboxValue> list) {
		JSONArray arr = new JSONArray();
		JSONObject root = new JSONObject();
		for (ComboboxValue temp : list) {
			arr.put(temp.parseToJson());
		}
		root.put(Ext.ROOT, arr);
		return root;
	}

	/**
	 * @return
	 */
	private JSONObject parseToJson() {
		JSONObject obj = new JSONObject();
		obj.put(Ext.ID, this.id);
		obj.put(Ext.VALUE, this.value);
		return obj;
	}
	
	
}
