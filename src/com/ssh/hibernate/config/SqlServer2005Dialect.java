package com.ssh.hibernate.config;

import org.hibernate.dialect.SQLServerDialect;

public class SqlServer2005Dialect extends SQLServerDialect {

	/**
	 * 
	 * 构造函数。
	 * 
	 */

	public SqlServer2005Dialect() {

		super();
		setSupportsVariableLimit(false);

	}

	/**
	 * 
	 * 是否需要绑定limit参数?
	 * 
	 * 在SQL Server中使用top时不能使用参数表示top条数,而使用ROW_NUMBER()则需要提供limit参数
	 * 
	 */

	private ThreadLocal<Boolean> supportsVariableLimit = new ThreadLocal<Boolean>();

	/**
	 * 
	 * <p>
	 * 设置是否先绑定limit参数。
	 * </p>
	 * 
	 * @author Reker
	 * 
	 * @param first
	 * 
	 */

	private void setSupportsVariableLimit(boolean first) {

		supportsVariableLimit.set(first);

	}

	/**
	 * 
	 * <p>
	 * 获取sql中select子句位置。
	 * </p>
	 * 
	 * @author Reker
	 * 
	 * @param sql
	 * 
	 * @return int
	 * 
	 */

	protected static int getSqlAfterSelectInsertPoint(String sql) {

		int selectIndex = sql.toLowerCase().indexOf("select");

		final int selectDistinctIndex = sql.toLowerCase().indexOf(
				"select distinct");

		return selectIndex + (selectDistinctIndex == selectIndex ? 15 : 6);

	}

	/*
	 * 
	 * @author Reker
	 * 
	 * <code>SQLServerDialect<code>中supportsLimit为true，
	 * 
	 * 但supportLimitOffset和supportsVariableLimit为false
	 * 
	 */

	public boolean supportsLimitOffset() {

		return true;

	}

	/*
	 * 
	 * @author Reker
	 * 
	 * @see org.hibernate.loader.Loader#bindLimitParameters(PreparedStatement
	 *      ,int ,RowSelection)
	 * 
	 * Hibernate在获得Limit String(已添加了limit子句)后，如果此方法返回true，
	 * 
	 * 则会添加额外的参数值(ROW_NUMBER()范围)(策略可能是这样：有offset设置两个参数值，没有设置一个参数值)
	 * 
	 */

	public boolean supportsVariableLimit() {

		return supportsVariableLimit.get();

	}

	/*
	 * 
	 * @author Reker
	 * 
	 * @see org.hibernate.loader.Loader#getMaxOrLimit(RowSelection,Dialect)
	 * 
	 */

	public boolean useMaxForLimit() {

		return true;

	}

	/*
	 * 
	 * @author Reker
	 * 
	 */

	public String getLimitString(String query, int offset, int limit) {

		setSupportsVariableLimit(offset > 0);

		if (offset == 0) { // no offset , use top , 这时不能支持limit参数绑定

			return new StringBuffer(query.length() + 8).append(query).insert(
					getSqlAfterSelectInsertPoint(query),

					" top " + limit).toString();

		}

		return getLimitString(query, offset > 0);

	}

	/*
	 * 
	 * @author Reker
	 * 
	 */

	public String getLimitString(String sql, boolean hasOffset) {

		int orderByIndex = sql.toLowerCase().lastIndexOf("order by");

		if (orderByIndex <= 0) {

			throw new UnsupportedOperationException(

					"must specify 'order by' statement to support limit operation with offset in sql server 2005");

		}

		String sqlOrderBy = sql.substring(orderByIndex + 8);

		String sqlRemoveOrderBy = sql.substring(0, orderByIndex);

		int insertPoint = getSqlAfterSelectInsertPoint(sql);

		return new StringBuffer(sql.length() + 100)
				.append("with tempPagination as(")
				.append(sqlRemoveOrderBy)
				.insert(
						insertPoint + 23,
						" ROW_NUMBER() OVER(ORDER BY " + sqlOrderBy
								+ ") as RowNumber,")
				.append(

				") select * from tempPagination where RowNumber between ? and ?")
				.toString();

	}
}
