package com.joey.service.impl;

import com.joey.dao.BaseDaoI;
import com.joey.model.TestBeans;
import com.joey.pageModel.TestBeansP;
import com.joey.pageModel.base.DataGrid;
import com.joey.service.TestBeansServiceI;
import com.joey.tools.DateTool;
import com.joey.tools.StringTool;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@Service("testBeansService")
public class TestBeansServiceImpl implements TestBeansServiceI {

    private BaseDaoI<TestBeans> testBeansDao;

    public BaseDaoI<TestBeans> getTestBeansDao() {
        return testBeansDao;
    }

    @Autowired
    public void setTestBeansDao(BaseDaoI<TestBeans> testBeansDao) {
        this.testBeansDao = testBeansDao;
    }

    public TestBeans save(TestBeansP t) {
        TestBeans tb = new TestBeans();
        BeanUtils.copyProperties(t, tb, new String[]{"createDatetimeTest"});
        tb.setCreateDatetimeTest(DateTool.getSystemTimestamp());
        this.testBeansDao.save(tb);
        return tb;
    }

    public DataGrid datagrid(TestBeansP t) {
        DataGrid dg = new DataGrid();
        String hql = "from TestBeans t ", countHql = "select count(*) ";
        Map<String, Object> args = new HashMap<String, Object>();
        hql = setWhere(t, hql, args);
        countHql += hql;
        hql = setOrder(t, hql);
        List<TestBeans> tl = this.testBeansDao.find(hql, args, t.getPage(), t.getRows());
        dg.setRows(tl);
        dg.setTotal(this.testBeansDao.count(countHql, args));
        return dg;
    }

    /**
     * ����ת��
     *
     * @param source
     * @return
     */
    // private List<TestBeansP> modelListConversion(List<TestBeans> source) {
    // List<TestBeansP> tpl = new ArrayList<TestBeansP>();
    // if (!ListTool.isNullOrEmpty(source)) {
    // for (TestBeans t : source) {
    // TestBeansP tp = new TestBeansP();
    // BeanUtils.copyProperties(t, tp);
    // tpl.add(tp);
    // }
    // }
    // return tpl;
    // }

    /**
     * where ��������
     *
     * @param t
     * @param hql
     * @param args
     * @return
     */
    private String setWhere(TestBeansP t, String hql, Map<String, Object> args) {
        String hqlp = "";
        if (!StringTool.isEmptyOrNull(t.getNameTest())) {
            hqlp += " t.nameTest like :nameTest";
            args.put("nameTest", "%%" + t.getNameTest() + "%%");
        }
        if (!StringTool.isEmptyOrNull(t.getSexTest())) {
            hqlp += " t.sexTest = :sexTest";
            args.put("sexTest", t.getSexTest());
        }
        if (!StringTool.isEmptyOrNull(hqlp)) {
            hql += " where " + hqlp;
        }
        return hql;
    }

    /**
     * �������� ����
     *
     * @param t
     * @param hql
     * @return
     */
    public String setOrder(TestBeansP t, String hql) {
        if (!StringTool.isEmptyOrNull(t.getSort()) && null != t.getOrder()) {
            hql += " order by " + t.getSort() + " " + t.getOrder();
        }
        return hql;
    }

}
