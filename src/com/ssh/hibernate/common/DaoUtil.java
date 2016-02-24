/**
 * 
 */
package com.ssh.hibernate.common;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.ruijie.util.transform.StringUtil;


/**
 * @author rj
 *
 */
public class DaoUtil {

	public static String UP = "ASC";
	
	public static String DOWN = "DESC";
	
	
	/**
	 * 对于ID列表通过逗号分隔的数据进行识别是使用in 还是 == ,同时过滤无效数据
	 * @return
	 */
	public static void getIDListRestrictions(Criteria criteria,String variable,
			String IdListJoin) {
		List<Integer> bugIdList = StringUtil.splitStringToIntegerList(IdListJoin);
		if(bugIdList.size() == 0){
			
		}else if (bugIdList.size() == 1) {
			criteria.add(Restrictions.eq(variable, bugIdList.get(0)));
		}else{
			criteria.add(Restrictions.in(variable,bugIdList));
		}
	}
	
	/**
	 * 对于ID列表通过逗号分隔的数据进行识别是使用in 还是 == ,同时过滤无效数据
	 * @param criteria
	 * @param string
	 * @param stateArr
	 */
	public static void getIDListRestrictions(Criteria criteria, String variable,
			Integer[] stateArr) {
		if (stateArr.length == 0) {
			
		}else if (stateArr.length == 1) {
			criteria.add(Restrictions.eq(variable, stateArr[0]));
		}else {
			criteria.add(Restrictions.in(variable,stateArr));
		}
	}
	
	/**
	 * 根据传进来的用逗号隔开的字符串转换成数据库的in语句
	 * @param str
	 * @param isString 如果是true,转换的语句要加单引号
	 * @return
	 */
	public static String parseSqlIn(String str,boolean isString){
		StringBuffer sqlin=new StringBuffer("");
		String[] arr=str.split(",");
		for(int i=0;i<arr.length;i++){
			String c=arr[i];
			if(c==null||"".equals(c.trim()))
				continue;
			if(isString)
				c="'"+c+"'";
			sqlin.append(c+",");
		}
		if(sqlin.length()>0)
			sqlin.deleteCharAt(sqlin.length()-1);
		return sqlin.toString();
	}
	
	/**
	 * @param string
	 * @param orSubmiterJoin
	 * @return
	 */
	   
	public static Criterion getIDListRestrictions(String variable,
			String IdListJoin) {
		List<Integer> bugIdList = StringUtil.splitStringToIntegerList(IdListJoin);
		if(bugIdList.size() == 0){
			
		}else if (bugIdList.size() == 1) {
			return Restrictions.eq(variable, bugIdList.get(0));
		}else{
			return Restrictions.in(variable,bugIdList);
		}
		return null;
	}
	
	
}
