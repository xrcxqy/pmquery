package com.ruijie.pm.action.pminfo;

import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import com.ruijie.pm.po.pminfo.PmInfo;
import com.ruijie.pm.querybean.pminfo.PmInfoQueryBean;
import com.ruijie.pm.service.pminfo.PmInfoProvider;
import com.ruijie.util.transform.Ext;
import com.ssh.struts.helper.MyActionSupport;
@SuppressWarnings("serial")
public class QueryAction extends MyActionSupport {
	private String type;
	private PmInfoQueryBean queryBean;
	private PmInfoProvider pmInfoProvider;
	/**
	 * http://192.168.231.103:8080/bug_switch/servlet/query?queryBean.submitDateFrom=2014-1-21
	 * query?queryBean.viewBugInfo.affectCaseCount=1
	 */
	@Override
	public String execute() throws Exception {
		if("init".equals(type)){
			return type;
		}
		JSONObject result = new JSONObject();
		JSONArray eachInfo = new JSONArray();
		if(queryBean == null){
			queryBean = new PmInfoQueryBean();
		}
//		
		if("queryResult".equals(type)){
			String exportExcel=getRequest().getParameter("exportExcel");
			JSONArray header = new JSONArray(getRequest().getParameter("header"));
			
			// 默认分页
			if (queryBean.getLimit() == 0) {
				queryBean.setLimit(30);
				queryBean.setStart(0);
			}
			
			// 如果是导出Excel,则就全部查询
			if("exportExcel".equals(exportExcel)){
				queryBean.setLimit(0);
				queryBean.setStart(0);
			}
			
			List<PmInfo> list = new ArrayList<PmInfo>();
			
			String tempColumn = null;
			int count = pmInfoProvider.queryByBean(queryBean, list);
			
			count = 2;
			list = pmInfoProvider.queryAll();
			for (PmInfo pmInfo : list) {
				JSONObject eachJsonObj = pmInfo.parseToJson();
				
				// 日期格式
				//String dateFormat = DateUtil.getPrecision(queryBean.getDatePrecision());
//				String dateFormat = DateUtil.getPrecision(4);
				
				// 非直接关联表,额外新增列的代码
				// 解决时间resolvedDate
				tempColumn = "resolvedDate";
				if (haveHeader(tempColumn,header)) {
//					Date date = stateChangeLogProvider.getResolvedDate(bugInfo.getBugId());
//					eachJsonObj.put(tempColumn,DateUtil.getDateFormat(dateFormat,date));
				}
				
				eachInfo.put(eachJsonObj);
			}			
			
			if("exportExcel".equals(exportExcel)){//导出excel
//				String date = DateUtil.getNowDateFormat(DateUtil.ACCURATE_MONTH_AND_DAY);
//				String fileName = "交换机bug系统" + date + ".xls";
//				fileName = new String(fileName.getBytes(),"ISO-8859-1");
//				getResponse().setContentType("application/msexcel;charset=UTF-8");
//				getResponse().addHeader("Content-Disposition", "attachment;filename=" + fileName);
//				OutputStream out = getResponse().getOutputStream();
//				ExcelUtil excelUtil = new ExcelUtil(header,eachInfo,"bug");
//				HSSFWorkbook hssfwork = excelUtil.getWorkBook();
//				hssfwork.write(out);
//				out.flush();
//				out.close(); 
//				return null;
			}else {
				List<String> strList = new ArrayList<String>();
				for (int i = 0; i < header.length(); i++) {
					strList.add(header.getJSONObject(i).getString("header").toString());
				}
			}
			result.put(Ext.TOTALCOUNT, count);
			result.put(Ext.ROOT, eachInfo);
		}else if("query".equals(type)){
			JSONObject params = queryBean.parseParams();
			getRequest().setAttribute("params", params);
			String colJson = getRequest().getParameter("hideSelectJson");
			getRequest().setAttribute("columns", colJson);
			return "queryResult";
		}
		autoResponse(result);
		return null;
	}

	private boolean haveHeader(String tempColumn, JSONArray header) {
		JSONObject json = null;
		for (int i = 0; i < header.length(); i++) {
			json = header.getJSONObject(i);
			if (json.has("dataIndex") && json.getString("dataIndex").equals(tempColumn)) {
				return true;
			}
		}
		return false;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public void setQueryBean(PmInfoQueryBean queryBean) {
		this.queryBean = queryBean;
	}

	public void setPmInfoProvider(PmInfoProvider pmInfoProvider) {
		this.pmInfoProvider = pmInfoProvider;
	}

	
}
