package com.ssh.hibernate.common;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.hibernate.impl.SessionFactoryImpl;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class CommonDao<T,PK extends Serializable>{
	private Class<T> entityClass;  
	
	/**
	 * 构造方法，根据实例类自动获取实体类类型 
	 */
	@SuppressWarnings("unchecked")
	public CommonDao() {
		this.entityClass = null;
		@SuppressWarnings("rawtypes")
		Class c = this.getClass();
		Type t = c.getGenericSuperclass();
		if(t instanceof ParameterizedType){
			Type[] p = ((ParameterizedType)t).getActualTypeArguments();
			 this.entityClass = (Class<T>) p[0];
		}
	}
	
	protected HibernateTemplate hibernateTemplate;

	public void setSessionFactory(SessionFactoryImpl sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	
	/**
	 * 保存某个对象
	 * @param entity
	 */
	public void save(T entity){
		hibernateTemplate.save(entity);
	}

	public void saveOrUpdate(T entity){
		hibernateTemplate.saveOrUpdate(entity);
	}
	
	/**
	 * 保存或更新某个对象列表
	 */ 
	public void saveOrUpdateAll(Collection<T> entities){
		hibernateTemplate.saveOrUpdateAll(entities);
	}
	
	/**
	 * 删除某个对象
	 * @param entity
	 */
	public void delete(T entity) {
		hibernateTemplate.delete(entity);
	}
	
	/**
	 * 删除某个对象集合
	 * @param entities
	 */
	public void deleteAll(Collection<T> entities) {
		hibernateTemplate.deleteAll(entities);
	}
	
	/** 
	 *	根据主键进行查询
	 *  如果主键为空,则返回null
	 */
	@SuppressWarnings("unchecked")
	public T get(PK id) {
		if (id == null) {
			return null;
		}
		return (T)hibernateTemplate.get(this.entityClass, id);
	}
	
	/**
	 * 从数据库查询
	 * @return
	 */
	public T getFromBD(PK id) {
		if (id == null) {
			return null;
		}
		return queryByVariableSingle("id",id);
	}
	
	/**
	 * 查询所有数据
	 * @return
	 */
	public List<T> queryAll() {  
        return queryAll(null,null);  
    } 
	
	/**
	 * 查询所有数据
	 * @param order 排序依据
	 * @return
	 */
	public List<T> queryAll(String order) {  
        return queryAll(order,null);  
    } 
	
	/**
	 * 查询所有数据
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> queryAll(String order,String upOrDown ) {  
		String sql = "from "+entityClass.getName();
		if (order != null) {
			sql += " order by " + order;
			if ("desc".equalsIgnoreCase(upOrDown)) {
				sql+= " desc";
			}
		}
        return (List<T> )hibernateTemplate.find(sql);  
    } 
	
	public List<T> queryByVariable(String name,Object value){
		return queryByVariable(name,value,null,null);
	}
	
	@SuppressWarnings("unchecked")
	public List<T> queryByVariable(String name,Object value,String order,String upOrdown){
		if (value == null) {
			return new ArrayList<T>();
		}
		
		String sql = "from " + entityClass.getName() + " temp where temp." + name + "=?";
		if (order != null) {
			sql += " order by temp." + order;
			if ("desc".equalsIgnoreCase(upOrdown)) {
				sql+= " desc";
			}
		}
		return (List<T>)hibernateTemplate.find(sql,value);
	}
	
	
	public T queryByVariableSingle(String name,Object value){
		List<T> list = queryByVariable(name,value,null,null);
		if (list != null && list.size() == 1) {
			return list.get(0);
		}else{
			return null;
		}
	}
	
	/**
	 * 使用HSQL语句直接增加、更新、删除实体
	 */ 
	public int bulkUpdate(String queryString) {
		return hibernateTemplate.bulkUpdate(queryString);
	}

	/**
	 * 使用带参数的HSQL语句增加、更新、删除实体
	 */ 
	public int bulkUpdate(String queryString, Object[] values) {
		return hibernateTemplate.bulkUpdate(queryString, values);
	}
	
	/**
	 * 批量保存
	 * @param o
	 */
	public void saveList(List<T> o) {
    	try{
    		getHibernateTemplate().saveOrUpdateAll(o);
    	}catch(Exception e){
    		System.out.println("DEALING:a different object with the same identifier value was already associated with the session\nOPERATER:Clear&Flush");
    		getHibernateTemplate().getSessionFactory().getCurrentSession().flush();
    		getHibernateTemplate().getSessionFactory().getCurrentSession().clear();
    		getHibernateTemplate().saveOrUpdateAll(o);
    	}
    }

}
