/**
 * 
 */
package com.ruijie.base.service.userconfig;

import java.util.ArrayList;
import java.util.List;

import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.util.container.Tree;

/**
 * @author rj
 *
 */
public class UserConfigProvider {
	/**
	 * 获得用户操作权限树
	 */
	public List<Tree> getUserOperateTreeByPid(Integer pid,UserInfo user) {
		if(pid == null){
			pid = 0;
		}
		List<Tree> treeList = new ArrayList<Tree>();
		if (pid == 0) {
			treeList.add(new Tree(1,0,"基本查询",null,"collectBug",true,false));
			treeList.add(new Tree(2,0,"系统配置",null,"myquery",true,false));
		}else if(pid == 1){
			treeList.add(new Tree(101,1,"维保查询","servlet/pminfo/query?type=init","search",false,true));
			treeList.add(new Tree(102,1,"待开发","servlet/query?type=init","addBug",false,true));
		}else if(pid == 2){
			treeList.add(new Tree(201,2,"待开发","servlet/bugInfo?type=initAdd","addBug",false,true));
			treeList.add(new Tree(202,2,"待开发","servlet/query?type=init","search",false,true));
		}
		return treeList;
	}
}
