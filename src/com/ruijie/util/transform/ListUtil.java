
package com.ruijie.util.transform;

import java.util.List;

public class ListUtil {
	public static boolean hasElement(List<? extends Object> list){
		if (list != null && list.size() != 0) {
			return true;
		}
		return false;
	}
}
