package com.joey.pageModel;

import java.sql.Timestamp;

public class TestBeansP {
    private int page;
    private int rows;
    private String sort;
    private String order;

    private Integer idTest;
    private String nameTest;
    private String sexTest;
    private Timestamp createDatetimeTest;
    private Double gongziTest;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Integer getIdTest() {
        return idTest;
    }

    public void setIdTest(Integer idTest) {
        this.idTest = idTest;
    }

    public String getNameTest() {
        return nameTest;
    }

    public void setNameTest(String nameTest) {
        this.nameTest = nameTest;
    }

    public String getSexTest() {
        return sexTest;
    }

    public void setSexTest(String sexTest) {
        this.sexTest = sexTest;
    }

    public Timestamp getCreateDatetimeTest() {
        return createDatetimeTest;
    }

    public void setCreateDatetimeTest(Timestamp createDatetimeTest) {
        this.createDatetimeTest = createDatetimeTest;
    }

    public Double getGongziTest() {
        return gongziTest;
    }

    public void setGongziTest(Double gongziTest) {
        this.gongziTest = gongziTest;
    }

}
