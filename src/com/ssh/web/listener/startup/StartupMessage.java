package com.ssh.web.listener.startup;
import java.io.InputStream;
import java.util.List;
import javax.servlet.ServletContextEvent;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import com.ruijie.util.transform.IgnoreDTDEntityResolver;

public class StartupMessage {
	private ServletContextEvent servletContextEvent;
	
	public StartupMessage(ServletContextEvent servletContextEvent) {
		this.servletContextEvent = servletContextEvent;
	}


	public void printMsg(){
		System.out.println();System.out.println();System.out.println();
		System.out.println("**************** 系统关键信息输出 开始 ****************");
		
		systemMsg();
		runtimeMsg();
		//quartzMsg();
		hibernateMsg();
		System.out.println();System.out.println();System.out.println();
		System.out.println("**************** 系统关键信息输出  结束 ****************");
		System.out.println();System.out.println();System.out.println();
	}

	


	/**
	 * 系统运行环境信息
	 */
	private void systemMsg() {
		System.out.println();
		System.out.println("------------ 系统环境信息  ------------------------------------------");
		String filePath = servletContextEvent.getServletContext().getRealPath("/");
		String serverInfo = servletContextEvent.getServletContext().getServerInfo();
		System.out.println("服务器信息：" + serverInfo);
		System.out.println("服务器路径：" + filePath);
		System.out.println("-------------------------------------------------------------------");
	}


	/**
	 * 系统运行内存信息
	 */
	public void runtimeMsg() {
		System.out.println();
		System.out.println("=========  系统运行内存信息   =========");
        System.out.println("最大可用内存:" + Runtime.getRuntime().maxMemory()/(1024*1024) + " M");
        System.out.println("当前空闲内存:" + Runtime.getRuntime().freeMemory()/(1024*1024)+ " M");
        System.out.println("总内存大小:" + Runtime.getRuntime().totalMemory()/(1024*1024) + " M");
        System.out.println("====================================");
	}
	
	/**
	 * 系统定时器是否开启信息
	
	private void quartzMsg() {
		System.out.println();
		System.out.println("############ 定时器启用情况  ###################################");
		System.out.println("1. 组织架构同步(OrgQuartzConfig.needInvokeJob) : " + OrgQuartzConfig.needInvokeJob);
		System.out.println("##############################################################");
	} */
	
	/**
	 * 数据库信息
	 */
	public void hibernateMsg() {
		System.out.println();
		System.out.println("=====================  hibernate 配置信息   ===========================================");
		
		InputStream inputstream = servletContextEvent.getServletContext().getResourceAsStream("/WEB-INF/classes/com/ssh/hibernate/config/hibernate.cfg.xml");
		//File file = new File("F:\\hibernate.cfg.xml");
		SAXReader saxReader = new SAXReader();  
		
		// 重写,不校验dtd文件
		saxReader.setValidation(false);
		saxReader.setEntityResolver(new IgnoreDTDEntityResolver());   
		Document doc = null;
		try {
			doc =saxReader.read(inputstream);
			//doc = saxReader.read(file);
			 Element config = doc.getRootElement().element("session-factory");  
			 @SuppressWarnings("unchecked")
			 List<Element> propertyList = config.elements();
			 
			 for (Element element : propertyList) {
				 // 抓取 property 属性信息
				 if ("property".equals(element.getName())) {
					System.out.format("%32s", element.attributeValue("name"));
					System.out.print(" : " );
					System.out.println(element.getText().trim());
				}
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("===================================================================================");
	}
	
	public static void main(String[] args) {
		new StartupMessage(null).hibernateMsg();
	}
}
