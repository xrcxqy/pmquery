/**
 * 
 */
package com.ruijie.util.container;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @author Ext 树结构
 *
 */
public class Tree {
	private int id;
	private Integer pid;
	private String text;
	private boolean leaf;
	private String iconCls;
	private String href;
	private boolean showLeaf ; 
	private boolean autoLoad;
	private boolean expanded;
	private String hrefTarget; 
	private boolean showCheck;
	private boolean check;
	private boolean showCheckLeafOnly;

	public String getHrefTarget() {
		return hrefTarget;
	}

	public void setHrefTarget(String hrefTarget) {
		this.hrefTarget = hrefTarget;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	/**
	 * 默认构造方法
	 */
	public Tree() {
	}
	
	/**
	 * @param id 节点ID
	 * @param pid 父节点ID
	 * @param text 文本
	 * @param href 链接
	 * @param iconCls 样式
	 * @param expanded 是否展开
	 * @param leaf 是否叶子
	 */
	public Tree(int id, Integer pid, String text, String href,String iconCls,Boolean expanded,Boolean leaf) {
		this.id = id;
		this.pid = pid;
		this.text = text;
		this.href = href;
		this.iconCls = iconCls;
		this.expanded = expanded;
		this.leaf = leaf;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	public boolean isShowLeaf() {
		return showLeaf;
	}
	public void setShowLeaf(boolean showLeaf) {
		this.showLeaf = showLeaf;
	}
	
	public boolean isAutoLoad() {
		return autoLoad;
	}
	public void setAutoLoad(boolean autoLoad) {
		this.autoLoad = autoLoad;
	}

	
	// 解析成JsonObject
	public JSONObject parseToJson(JSONObject obj){
		if (obj == null) {
			obj = new JSONObject();
		}
		obj.put("id", this.id);
		obj.put("pid", this.pid);
		obj.put("text", this.text);
		obj.put("autoLoad", this.autoLoad);
		obj.put("expanded", this.expanded);
		// 路径
		if (this.href != null) {
			obj.put("href", this.href);
		}
		
		// 样式
		if (this.iconCls != null) {
			obj.put("iconCls", this.iconCls);
		}
		
		// 是否显示叶子
		if (this.showLeaf) {
			obj.put("leaf", this.leaf);
		}else if(this.leaf){
			obj.put("children",new JSONArray());
		}
		
		if (this.hrefTarget != null) {
			obj.put("hrefTarget", this.hrefTarget);
		}
		
		if(this.showCheck){
			if(this.showCheckLeafOnly){
				if(this.leaf){
					obj.put("checked", this.check);
				}
			}else{
				obj.put("checked", this.check);
			}
		}
		return obj;
	}

	public boolean isShowCheck() {
		return showCheck;
	}

	public void setShowCheck(boolean showCheck) {
		this.showCheck = showCheck;
	}

	public boolean isCheck() {
		return check;
	}

	public void setCheck(boolean check) {
		this.check = check;
	}

	public boolean isShowCheckLeafOnly() {
		return showCheckLeafOnly;
	}

	public void setShowCheckLeafOnly(boolean showCheckLeafOnly) {
		this.showCheckLeafOnly = showCheckLeafOnly;
	}
}
