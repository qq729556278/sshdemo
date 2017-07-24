package com.joey.action;

import com.joey.action.base.BaseAction;
import com.joey.model.TestBeans;
import com.joey.pageModel.TestBeansP;
import com.joey.service.TestBeansServiceI;
import com.opensymphony.xwork2.ModelDriven;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

@Namespace("/")
@Action(value = "testAction")
@Results({@Result(name = "index", location = "/index.jsp")})
public class TestAction extends BaseAction implements ModelDriven<TestBeansP> {

    private TestBeansP testBeanP = new TestBeansP();

    public TestBeansP getModel() {
        return testBeanP;
    }

    private TestBeansServiceI testBeansService;

    public TestBeansServiceI getTestBeansService() {
        return testBeansService;
    }

    @Autowired
    public void setTestBeansService(TestBeansServiceI testBeansService) {
        this.testBeansService = testBeansService;
    }

    public void add() {
        try {
            TestBeans tp = this.testBeansService.save(testBeanP);
            super.result.setSuccess(true);
            super.result.setMsg("添加成功！");
            super.result.setObj(tp);
        } catch (Exception e) {
            super.result.setMsg(e.getMessage());
        }
        super.writeJson();
    }

    public void datagrid() {
        super.writeJson(this.testBeansService.datagrid(testBeanP));
    }

    public String jump() {
        ServletActionContext.getRequest().setAttribute("test", 100000);
        return "index";
    }
}
