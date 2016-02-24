package com.ssh.web.listener.startup;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitApplicationListener implements ServletContextListener {
	
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		StartupMessage sm = new StartupMessage(servletContextEvent);
		sm.printMsg();
	}

	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
