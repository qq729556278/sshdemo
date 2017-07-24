package com.joey.model;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Created by joey on 2017/7/24.
 */
@Entity
@Table(name = "test_beans_", catalog = "")
public class TestBeans {
    private Integer idTest;
    private String nameTest;
    private String sexTest;
    private Timestamp createDatetimeTest;
    private Double gongziTest;

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ID_TEST_", nullable = false)
    public Integer getIdTest() {
        return idTest;
    }

    public void setIdTest(Integer idTest) {
        this.idTest = idTest;
    }

    @Basic
    @Column(name = "NAME_TEST_", nullable = false, length = 255)
    public String getNameTest() {
        return nameTest;
    }

    public void setNameTest(String nameTest) {
        this.nameTest = nameTest;
    }

    @Basic
    @Column(name = "SEX_TEST_", nullable = true, length = 255)
    public String getSexTest() {
        return sexTest;
    }

    public void setSexTest(String sexTest) {
        this.sexTest = sexTest;
    }

    @Basic
    @Column(name = "CREATE_DATETIME_TEST_", nullable = true)
    public Timestamp getCreateDatetimeTest() {
        return createDatetimeTest;
    }

    public void setCreateDatetimeTest(Timestamp createDatetimeTest) {
        this.createDatetimeTest = createDatetimeTest;
    }

    @Basic
    @Column(name = "GONGZI_TEST_", nullable = true, precision = 0)
    public Double getGongziTest() {
        return gongziTest;
    }

    public void setGongziTest(Double gongziTest) {
        this.gongziTest = gongziTest;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TestBeans testBeans = (TestBeans) o;

        if (idTest != null ? !idTest.equals(testBeans.idTest) : testBeans.idTest != null) return false;
        if (nameTest != null ? !nameTest.equals(testBeans.nameTest) : testBeans.nameTest != null) return false;
        if (sexTest != null ? !sexTest.equals(testBeans.sexTest) : testBeans.sexTest != null) return false;
        if (createDatetimeTest != null ? !createDatetimeTest.equals(testBeans.createDatetimeTest) : testBeans.createDatetimeTest != null)
            return false;
        if (gongziTest != null ? !gongziTest.equals(testBeans.gongziTest) : testBeans.gongziTest != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idTest != null ? idTest.hashCode() : 0;
        result = 31 * result + (nameTest != null ? nameTest.hashCode() : 0);
        result = 31 * result + (sexTest != null ? sexTest.hashCode() : 0);
        result = 31 * result + (createDatetimeTest != null ? createDatetimeTest.hashCode() : 0);
        result = 31 * result + (gongziTest != null ? gongziTest.hashCode() : 0);
        return result;
    }
}
