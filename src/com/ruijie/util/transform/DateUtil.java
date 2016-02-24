package com.ruijie.util.transform;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;

public class DateUtil {


	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static final String ACCURATE_TO_SECOND_EN = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * yyyy-MM-dd HH:mm
	 */
	public static final String ACCURATE_TO_MINUTE_EN = "yyyy-MM-dd HH:mm";

	/**
	 * yyyy-MM-dd HH:mm
	 */
	public static final String ACCURATE_TO_HOUR_EN = "yyyy-MM-dd HH";
	
	/**
	 * yyyy-MM-dd
	 */
	public static final String ACCURATE_TO_DAY_EN = "yyyy-MM-dd";
	
	/**
	 * yyyyMMdd
	 */
	public static final String ACCURATE_TO_DAY_EN_None = "yyyyMMdd";
	
	/**
	 * MM-dd
	 */
	public static final String ACCURATE_MONTH_AND_DAY = "MM-dd";
	
	/**
	 * 昨天 : 1
	 */
	public static Integer DynamicDateYesterDay    = 1;
	
	/**
	 * 今天 : 1
	 */
	public static Integer DynamicDateToDay    = 8;
	
	/**
	 * 上周   是指上周一到周天 : 2
	 */
	public static Integer DynamicDateLastWeek   = 2;

	/**
	 * 本周   是指上周一到周天 : 9
	 */
	public static Integer DynamicDateWeek   = 9;
	
	/**
	 * 上个月  是指上个月一号到最后一天 : 3
	 */
	public static Integer DynamicDateLastMonth	= 3;

	/**
	 * 上个月  是指上个月一号到最后一天 : 3
	 */
	public static Integer DynamicDateMonth	= 10;
	/**
	 * 去年   去年第一天到最后一天 : 4
	 */
	public static Integer DynamicDateLastYear	= 4;
	
	/**
	 * 上周   当前时间后推一周 : 5
	 */
	public static Integer DynamicDateNearlyWeek   = 5;
	
	/**
	 * 上个月 当前时间后推一个月 : 6
	 */
	public static Integer DynamicDateNearlyMonth   = 6;
	
	/**
	 * 去年  当前时间后推一年 : 7
	 */
	public static Integer DynamicDateNearlyYear   = 7;
	
	/**
	 * 返回当前sql.Date数据
	 * @return
	 */
	public static Date getNowSQLDate() {
		return new java.sql.Date(new java.util.Date().getTime());
	}
	
	/**
	 * 放回当前的util.Date
	 * @return
	 */
	public static java.util.Date getNowUtilDate(){
		return new java.util.Date();
	}
	
	/**
	 * 获得格式化后的当前时间
	 * 格式为：yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String getNowDateFormat(){
		return getDateFormat(new java.util.Date(),ACCURATE_TO_SECOND_EN);
	}
	
	/**
	 * 获得格式化后的当前时间
	 * @return
	 */
	public static String getNowDateFormat(String string){
		return getDateFormat(new java.util.Date(),string);
	}
	
	/**
	 * 把java.util.Date 转换成 java.sql.Date
	 * @param date 待转换的java.util.Date	对象
	 * @return 转换成功后的 java.sql.Date 对象
	 */
	public static java.sql.Date utilDateToSqlDate(java.util.Date date){
		return new java.sql.Date(date.getTime());
	}

	public static java.util.Date sqlDateToUtilDate(java.sql.Date date){
		return new java.util.Date(date.getTime());
	}
	
	/**
	 * 根据指定的格式放回必要的信息
	 * @param format
	 * @param date
	 * @return
	 */
	public static String getDateFormat(java.sql.Date date,String format){
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(date);
	}
	
	/**
	 * 根据指定的格式放回必要的信息
	 * @param format
	 * @param date
	 * @return
	 */
	public static String getDateFormat(java.util.Date date){
		return getDateFormat(date,ACCURATE_TO_DAY_EN);
	}
	
	/**
	 * 根据指定的格式放回必要的信息
	 * 如果date为null 则返回""
	 * @param format
	 * @param date
	 * @return
	*/
	public static String getDateFormat(java.util.Date date,String format){
		if (date != null) {
			SimpleDateFormat dateFormat = new SimpleDateFormat(format);
			return dateFormat.format(date);
		}else{
			return "";
		}
	}
	 
	
	

	public static String getPrecision(Integer i){
		if (i == null) {
			return ACCURATE_TO_DAY_EN;
		}
		
		if (i.equals(2)) {
			return ACCURATE_TO_HOUR_EN;
		}else if (i.equals(3)) {
			return ACCURATE_TO_MINUTE_EN;
		}else if (i.equals(4)) {
			return ACCURATE_TO_SECOND_EN;
		}else{
			return ACCURATE_TO_DAY_EN;
		}
	}
	
	/**
	 * 把传递进来的string转换成data对象
	 * @param dataStr
	 * @return
	 * @throws ParseException
	 */
	public static java.util.Date getData(String dataStr){
		if(!StringUtil.notNullORempty(dataStr)){
			return null;
		}else {
			try {
				return DateFormat.getDateInstance().parse(dataStr);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	public static java.util.Date getData(String dataStr,String format){
		if(!StringUtil.notNullORempty(dataStr)){
			return null;
		}
		
		String useFormat = ACCURATE_TO_SECOND_EN;
		if(!StringUtil.notNullORempty(dataStr)){
			useFormat = format;
		}
		DateFormat dateFormat = new SimpleDateFormat(useFormat);
		 try {
			return dateFormat.parse(dataStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static int getMinuteByTimeStr(String time){
		int minute = 0;
		if (StringUtil.notNullORempty(time)) {
			time = time.toUpperCase();
			
			if(time.matches("^\\d+([.]{1}[0-9]+)?$")){
				minute = (int)Double.valueOf(time).intValue();
			}else if(time.matches("^\\d+([.]{1}[0-9]+)?[W|D|H|M]?$")){
				String unit = time.substring(time.length()-1, time.length());
				String date = time.substring(0,time.length()-1);
				
				// 周
				if ("W".equals(unit)) {
					minute = (int)(Double.valueOf(date).doubleValue() * 7 * 24 * 60);
				}
				// 天
				else if("D".equals(unit)){
					minute = (int)(Double.valueOf(date).doubleValue() * 24 * 60);
				}
				// 小时
				else if("H".equals(unit)){
					minute = (int)(Double.valueOf(date).doubleValue() * 60);
				}
				// 分钟
				else if("M".equals(unit)){
					minute = (int)Double.valueOf(date).intValue();
				}
			}
		}
		return minute;
	}
	

	/**
	 * 根据当前时间来获得两个时间段<br/>
	 * 返回的值通过map中的 startDate 和 endDate 来获取<br/>
	 * 获得的数据格式为yyyy-MM-dd <br/>
	 * 时间点的关系是  [startDate,endDate)<br/>
	 * 即:startDate:00:00:00 到 endDate:00:00:00 (endDate 的前一天 23:59:59)
	 * @param dynamicDate
	 */
	   
	public static java.util.Map<String, Object> getDynamicDate(Integer dynamicDate) {
		java.util.Map<String, Object> map = new HashMap<String, Object>();
		String startDate = null;
		String endDate = null;
		String format = ACCURATE_TO_DAY_EN + " 00:00:00";
		Calendar cal = Calendar.getInstance();
		if (dynamicDate == DynamicDateYesterDay) {
			// 当前时间
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 时间减去一天
			cal.add(Calendar.DATE,-1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateToDay){
			startDate = new SimpleDateFormat(format).format(cal.getTime());
			// 时间减去一天
			cal.add(Calendar.DATE,+1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
		}
		else if(dynamicDate == DynamicDateLastWeek){
			// 设置一周从周一开始
			cal.setFirstDayOfWeek(Calendar.MONDAY);
			
			// 本周周一时间
			cal.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 减去一周时间,下周周一时间
			cal.add(Calendar.WEDNESDAY, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateWeek){
			cal.setFirstDayOfWeek(Calendar.MONDAY);
			cal.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
			cal.add(Calendar.WEDNESDAY, +1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateLastMonth){
			//获得每一个1号数据
			cal.set(Calendar.DAY_OF_MONTH, 1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 减去一个月时间,下个月1号
			cal.add(Calendar.MONTH, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateMonth){
			//获得每一个1号数据
			cal.set(Calendar.DAY_OF_MONTH, 1);
			startDate  = new SimpleDateFormat(format).format(cal.getTime());
			
			// 减去一个月时间,下个月1号
			cal.add(Calendar.MONTH, +1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
		}else if(dynamicDate == DynamicDateLastYear){
			//获得每一个1号数据
			cal.set(Calendar.DAY_OF_YEAR, 1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 减去一个月时间,下个月1号
			cal.add(Calendar.YEAR, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateNearlyWeek){
			//当前时间加一天
			cal.add(Calendar.DATE, 1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 原先多加的一天先清除,当前时间在倒推一周
			cal.add(Calendar.DATE, -1);
			cal.add(Calendar.WEDNESDAY, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateNearlyMonth){
			//当前时间加一天
			cal.add(Calendar.DATE, 1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 原先多加的一天先清除,当前时间在倒推一周
			cal.add(Calendar.DATE, -1);
			cal.add(Calendar.MONTH, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}else if(dynamicDate == DynamicDateNearlyYear){
			//当前时间加一天
			cal.add(Calendar.DATE, 1);
			endDate = new SimpleDateFormat(format).format(cal.getTime());
			
			// 原先多加的一天先清除,当前时间在倒推一周
			cal.add(Calendar.DATE, -1);
			cal.add(Calendar.YEAR, -1);
			startDate = new SimpleDateFormat(format).format(cal.getTime());
		}
		
		if(startDate != null && endDate != null){
			map.put("startDateString", startDate);
			map.put("endDateString", endDate);
			map.put("startDate", getData(startDate));
			map.put("endDate", getData(endDate));
		}
		return map;
	}
	
	public static void main(String[] args) throws Exception {
		java.util.Date date = getData("2014-4-4 20:15:10");
		System.out.println( getDateFormat(date,ACCURATE_TO_SECOND_EN));
		 java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
//        String s = format1.format(new java.util.Date());
        System.out.println(format1.parse("2014-4-4 20:15:10"));
//		java.util.Map<String, Object> i = getDynamicDate(DynamicDateLastWeek);
//		System.out.println("start: " + i.get("startDateString"));
//		System.out.println("end  : " + i.get("endDateString"));
		
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(getData("2014-5-31"));
//		pfDate(cal);
//		cal.add(Calendar.DATE, 1);
//		pfDate(cal);
//		cal.add(Calendar.DATE, -1);
//		cal.add(Calendar.YEAR, -1);
//		pfDate(cal);
	}
	
	public static void pfDate(Calendar cal){
		String date = new SimpleDateFormat(ACCURATE_TO_SECOND_EN).format(cal.getTime());
		System.out.println(date);
	}
	
	
}
