package com.ruijie.util.transform;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class StringUtil {
	public static String dif(String obj1,String obj2,String objName){
		if(obj1==null||"".equals(obj1.trim()))
			obj1="[空]";
		if(obj2==null||"".equals(obj2.trim()))
			obj2="[空]";
		if(!obj1.equals(obj2))
			return objName+"由"+obj1+"变更为"+obj2;
		return "";
	}
	public static String parseDateToStr(Date date, String rule) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat(rule);
		return sdf.format(date);
	}
	
	public static Date parseStrToDate(String dateStr,String rule) throws ParseException{
		if(dateStr==null||"".equals(dateStr)){
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(rule);
		return sdf.parse(dateStr);
	}

	public static String parseOrder(String order){
		int index=order.lastIndexOf("_");
		if(index>-1){
			return order.substring(0, index)+"."+order.substring(index+1);
		}else
			return order;
	}
	
	public static String formatStr(String source) {
		if(source == null) return "";
		return source.trim().replaceAll("\r", "").replaceAll("\n", "");
	}
	
	/**
	 * 
	 * @author lgf
	 * @Description: 如果str为空或则为""返回false, 非空放回true
	 * @CreateDate 2012 一月 13 17:34:26
	 * @lastModified 2012 一月 13 17:34:26
	 * @version 1.0
	 * @param str 要验证的字符串
	 * @return
	 */
	public static boolean notNullORempty(String str){
		return str != null && !"".equals(str.trim())?true:false;
	}
	
	/**
	 * 判断字符串是否为空或则null,如果是则返回true
	 * @param checkStr
	 * @return
	 */
	public static boolean isNullOrEmpty(String checkStr){
		return !notNullORempty(checkStr);
	}
	
	public static boolean equalIgnorNull(String a,String b){
		if((a==null||"".equals(a.trim()))&&(b==null||"".equals(b.trim())))
			return true;
		else if(a!=null&&b!=null&&a.equals(b))
			return true;
		return false;
	}
	
	public static String getAMark(String value, String url) {
		return "<a href='" + url+ "'>" + value + "</a>";
	}
	
	/**
	 * 如果字符串的末位是指定的字符串,则移除该字符串后返回
	 * @param str
	 * @param lastChar
	 * @return
	 */
	public static String removeLastCharIfExist(String str ,String lastChar){
		if (str != null && str.length() > 0) {
			if (str.lastIndexOf(lastChar) == str.length() -1) {
				return str.substring(0, str.length() -1);
			}
		}
		return str;
	}
	
	/**
	 * 如果最后一个字符串是逗号,则移除逗号<br/><br/>
	 * 如果需要移除其他符号
	 * @seeremoveLastCharIfExist(String str ,String lastChar)
	 */
	public static String removeLastCharIfExist(String str){
		return removeLastCharIfExist(str,",");
	}
	
	/*
	 * 将用分隔符隔开的字符串转换成数组
	 */
	public static String[] getSplitValuse(String resource){
		if(resource!=null&!"".equals(resource.trim())){
			resource=resource.trim();
			resource=resource.replaceAll("，", ",");
			resource=resource.replaceAll(";", ",");
			resource=resource.replaceAll("；", ",");
			resource=resource.replaceAll("、", ",");
			resource=resource.replaceAll(" ", ",");
			resource=resource.replaceAll("　", ",");
			String[] result= resource.split(",");
			ArrayList<String> notEmptyResult=new ArrayList<String>();
			for(int i=0;i<result.length;i++){
				if(result[i].trim().length()>0)
					notEmptyResult.add(result[i].trim());
			}
			if(notEmptyResult.size()>0){
				String[] temp=new String[notEmptyResult.size()];
				for(int i=0;i<notEmptyResult.size();i++)
					temp[i]=notEmptyResult.get(i);
				return temp;
			}	
		}
		return null;
	}

	public static Integer[] splitStringToIntegerArr(String resource) {
		if (notNullORempty(resource)) {
			String [] strTemp = resource.split(",");
			Integer[] temp = new Integer[strTemp.length];
			
			for (int i = 0; i < strTemp.length; i++) {
				temp [i] = Integer.valueOf(strTemp[i]);
			}
			return temp;
		}
		return null;
	}
	
	public static List<Integer> splitStringToIntegerList(String resource) {
//		return splitStringToList(resource);
		
		List<Integer> list = new ArrayList<Integer>();
		if (notNullORempty(resource)) {
			String [] strTemp = resource.split(",");
			for (int i = 0; i < strTemp.length; i++) {
				if(notNullORempty(strTemp[i])){
					list.add(Integer.valueOf(strTemp[i]));
				}
			}
		}
		return list;
	}
	
	/**
	 * 将Text格式转换成HTML格式
	 * @param resource
	 * @return
	 */
	public static String textToHtml(String str){
		if (str == null) {
			return "";
		}else if (str.length() == 0) {
			return "";
		}
		str = str.replaceAll("\r\n", "<br/>");
		str = str.replaceAll("\n", "<br/>");
		str = str.replaceAll("\r", "<br/>");
		str = str.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
		
		//防止 js 注入
		str = str.replace("<script>", "&lt;script&gt;");
		str = str.replace("</script>", "&lt;/script&gt;");
		return str;
	}
	
	/**
	 * 
	 * @param resource
	 * @return
	 */
	   
	public static List<String> splitStringToStringList(String resource,String splitChar) {
		List<String> list = new ArrayList<String>();
		if (notNullORempty(resource)) {
			String [] strTemp = resource.split(splitChar);
			for (int i = 0; i < strTemp.length; i++) {
				if(notNullORempty(strTemp[i])){
					list.add(strTemp[i]);
				}
			}
		}
		return list;
	}
	
	public static List<String> splitStringToStringList(String resource){
		return splitStringToStringList(resource,",");
	}
	
	/**
	 * 
	 * @Description : 把temp中的list String 拼接成用于In语句格式的String
	 * @param temp
	 * @return ('xx','xx')  or ()
	 */
	public static String parstStringListInSQLFormat(List<String> temp){
		if (temp == null) {
			return "()";
		}
		StringBuffer insql = new StringBuffer();
		insql.append("(");
		int size = temp.size();
		for (int i = 0; i < size; i++) {
			insql.append("'");
			insql.append(temp.get(i));
			if (i + 1 < size) {
				insql.append("',");
			}else{
				insql.append("'");
			}
		}
		insql.append(")");
		return insql.toString();
	}
	
	public static String parstIntListInSQLFormat(List<Integer> temp){
		if (temp == null) {
			return "()";
		}
		StringBuffer insql = new StringBuffer();
		insql.append("(");
		int size = temp.size();
		for (int i = 0; i < size; i++) {
			insql.append(temp.get(i));
			if (i + 1 < size) {
				insql.append(",");
			}
		}
		insql.append(")");
		return insql.toString();
	}
	
	public static void main(String[] args) {
		System.out.println("a\tb");
		System.out.println("a	b".length());
	}
	
	/**
	 * 把String List转换成json,用于前台下拉框调用
	 * @param list
	 * @return
	 */
	public static JSONObject parseToJson(List<String> list){
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
		for (String str : list) {
			if(str != null){
				JSONObject each = new JSONObject();
				each.put(Ext.ID, str);
				each.put(Ext.VALUE, str);
				arr.put(each);
			}
		}
		obj.put(Ext.ROOT, arr);
		return obj;
	}
}
