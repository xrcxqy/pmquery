/**
 * 
 */
package com.ssh.spring.helper;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

/**
 * @author rj
 *
 */
public class BeanFactoryHelper implements BeanFactoryAware {
	private static BeanFactory beanFactory; //BEAN工厂
	 
    @SuppressWarnings("static-access")
	public void setBeanFactory(BeanFactory f) throws BeansException {
        this.beanFactory = f; 
    }
    public static BeanFactory getBeanfactory() {   
        return beanFactory;   
    }
}
