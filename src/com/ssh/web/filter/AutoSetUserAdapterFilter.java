package com.ssh.web.filter;
import java.io.IOException;
import java.security.ProviderException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.jasig.cas.client.validation.Assertion;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ruijie.base.po.userconfig.UserInfo;
import com.ruijie.base.service.userconfig.UserInfoProvider;

public class AutoSetUserAdapterFilter implements Filter {
	protected UserInfoProvider userInfoProvider;
	
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		System.out.println("*** AutoSetUserAdapterFilter ** 登入校验 ");
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
//		HttpServletResponse httpResponse = (HttpServletResponse) response;
		// _const_cas_assertion_是CAS中存放登录用户名的session标志
		Object object = httpRequest.getSession().getAttribute("_const_cas_assertion_");
		
		// 过滤单点登入,默认使用管理员
		boolean needSsoLogin = false;
		
        if (object != null || !needSsoLogin) {
        	String loginName = "admin";
        	if (needSsoLogin) {
        		Assertion assertion = (Assertion) object;
        		loginName = assertion.getPrincipal().getName();
			}
            
            UserInfo user=(UserInfo)httpRequest.getSession().getAttribute("user");
        	if (user == null) {
	        	try {
	        		if(!needSsoLogin){
	        			user = new UserInfo();
		            	user.setName("LGF");
		            	user.setId(1);
	        		}else{
	        			user = userInfoProvider.getUserByExternalID(loginName);
	        		}
				} catch (ProviderException e) {
					e.printStackTrace();
					response.setContentType("text/html");
	        		response.getWriter().write("<body>您的帐号出现异常，请联系管理员 翁才盛（网研十三部MIG）</body>");
	        		return ;
				}
	        	if(user==null){
	        		response.setContentType("text/html");
	        		response.getWriter().write("<body>您的帐号可能未映射到报表系统或未分配报表系统权限，请联系管理员 翁才盛（网研十三部MIG）开通</body>");
	        		return ;
	        	}else{
//	        		//记录用户登入次数
//	        		UserLoginInfo userLoginInfo = new UserLoginInfo();
//	        		userLoginInfo.setUser(user);
//					userLoginInfo.setIp(request.getRemoteAddr());
//					userLoginInfoProvider.add(userLoginInfo);
	        	}
//	        	UserSetting setting = userSettingProvider.queryByUserIdOrDefault(user.getId());
//	        	httpRequest.getSession().setAttribute("userSetting", setting);
	        	httpRequest.getSession().setAttribute("user", user);
	        }
        }else{
        	System.out.println("AutoSetUserAdapterFilter Session 未找到,重新登录");
        }
        chain.doFilter(request, response);

	}
	public void init(FilterConfig arg0) throws ServletException {
		userInfoProvider=(UserInfoProvider)WebApplicationContextUtils.getRequiredWebApplicationContext(arg0.getServletContext()).getBean("userInfoProvider");
	}
	
	public void destroy() {
	}

	
}
