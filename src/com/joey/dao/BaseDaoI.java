package com.joey.dao;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;


public interface BaseDaoI<T> {

    Serializable save(T o);

    void delete(T o);

    void update(T o);

    void saveOrUpdate(T o);

    T get(Class<T> c, Serializable id);

    T get(String hql);

    T get(String hql, Map<String, Object> params);

    List<T> find(String hql);

    List<T> find(String hql, Map<String, Object> params);

    List<T> find(String hql, int page, int rows);

    List<T> find(String hql, Map<String, Object> params, int page,
                 int rows);

    Long count(String hql);

    Long count(String hql, Map<String, Object> params);

    int executeHql(String hql);

    int executeHql(String hql, Map<String, Object> params);

    List<Object[]> findBySql(String sql);

    List<Object[]> findBySql(String sql, int page, int rows);

    List<Object[]> findBySql(String sql, Map<String, Object> params);

    List<Object[]> findBySql(String sql, Map<String, Object> params,
                             int page, int rows);

    int executeSql(String sql);

    int executeSql(String sql, Map<String, Object> params);

    BigInteger countBySql(String sql);

    BigInteger countBySql(String sql, Map<String, Object> params);

}
