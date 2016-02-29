/**
 * 
 */
package com.ruijie.base.po.system;


import org.json.JSONObject;

import com.ssh.hibernate.common.CommonPO;
import com.ssh.hibernate.common.CommonPOConfig;

/**
 * @author rj
 *
 */
public class SysQueryItem extends CommonPO {
	private Integer id;
	private String header;
	private String dataIndex;
	private Integer width;
	private Boolean sortable;
	private Boolean dragable;
	private Boolean selected;
	private String type;
	private Integer showOrder;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getHeader() {
		return header;
	}
	public void setHeader(String header) {
		this.header = header;
	}
	public String getDataIndex() {
		return dataIndex;
	}
	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}
	public Integer getWidth() {
		return width;
	}
	public void setWidth(Integer width) {
		this.width = width;
	}
	public Boolean getSortable() {
		return sortable;
	}
	public void setSortable(Boolean sortable) {
		this.sortable = sortable;
	}
	public Boolean getDragable() {
		return dragable;
	}
	public void setDragable(Boolean dragable) {
		this.dragable = dragable;
	}
	public Boolean getSelected() {
		return selected;
	}
	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getShowOrder() {
		return showOrder;
	}
	public void setShowOrder(Integer showOrder) {
		this.showOrder = showOrder;
	}

	@Override
	public JSONObject parseToJson(JSONObject obj, CommonPOConfig config) {
		if(obj == null){
			obj = new JSONObject();
		}
		obj.put("id", this.id);
		obj.put("sysid", this.id);
		obj.put("header", this.header);
		obj.put("dataIndex", this.dataIndex);
		obj.put("width", this.width);
		obj.put("showOrder", this.showOrder);
		obj.put("sortable", this.sortable);
		obj.put("dragable", this.dragable);
		if(this.type != null){
			obj.put("type", this.type);
		}
		obj.put("selected", this.selected);
		return obj;
	}
}
