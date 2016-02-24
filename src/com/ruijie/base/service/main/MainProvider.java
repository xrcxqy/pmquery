package com.ruijie.base.service.main;

import java.util.ArrayList;
import java.util.List;

import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.util.container.Tree;

public class MainProvider {

	public List<Tree> getUserOperateTreeByPid(Integer pid, UserInfo user) {
		List<Tree> treeList = new ArrayList<Tree>();
		if (pid == 0) {
			treeList.add(new Tree(10, 0, "提交数据", null, null, true, false));
			treeList.add(new Tree(20, 0, "查询数据", null, null, true, false));
			treeList.add(new Tree(30, 0, "系统帮助", null, null, true, false));
		}else if(pid == 10){
			treeList.add(new Tree(110,10,"提交测试数据","servlet/bugInfo?type=initAdd",null,false,true));
			treeList.add(new Tree(120,10,"提交正式数据","servlet/query?type=init",null,false,true));
		}else if(pid == 20){
			treeList.add(new Tree(210,20,"查询数据方法一","servlet/bugInfo?type=initAdd",null,false,true));
			treeList.add(new Tree(220,20,"查询数据方法二","servlet/query?type=init",null,false,true));
		}else if(pid == 30){
			treeList.add(new Tree(210,20,"如何提交数据","servlet/bugInfo?type=initAdd",null,false,true));
			treeList.add(new Tree(220,20,"如何查询数据","servlet/query?type=init",null,false,true));
		}
		return treeList;
	}

}
