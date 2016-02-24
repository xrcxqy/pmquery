/**
 * 
 */
package com.ruijie.util.transform;
import java.util.List;
import org.json.JSONArray;

import com.ruijie.util.container.Tree;
/**
 * @author rj
 *
 */
public class TreeUtil{
	
	/**
	 * Tree 是否需要Check框：仅仅是孩子节点需要
	 */
	public static Integer treeChecked_childrenOnly = 1;
	
	/**
	 * Tree 是否需要Check框:全部都需要
	 */
	public static Integer treeChecked_AllNeed = 2;

	/**
	 * 转换成jsonArray
	 * @param treeList
	 * @return
	 */
	public static JSONArray parseJSONArray(List<Tree> treeList){
		JSONArray jsonArr = new JSONArray();
		for (Tree tree : treeList) {
			tree.setShowLeaf(true);
			jsonArr.put(tree.parseToJson(null));
		}
		return jsonArr;
	}
}
