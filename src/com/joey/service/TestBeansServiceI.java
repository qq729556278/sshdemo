package com.joey.service;

import com.joey.model.TestBeans;
import com.joey.pageModel.TestBeansP;
import com.joey.pageModel.base.DataGrid;

public interface TestBeansServiceI {

    /**
     * ���淽��
     *
     * @return
     */
    public TestBeans save(TestBeansP t);

    /**
     * ��ѯ ����
     *
     * @param t
     * @return
     */
    public DataGrid datagrid(TestBeansP t);

}
