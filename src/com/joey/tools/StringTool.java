package com.joey.tools;

public class StringTool {

    /**
     * �ж��ַ����ǲ���NULL ����Ϊ ����
     *
     * @param s
     * @return boolean
     */
    public static boolean isEmptyOrNull(String s) {
        return (s == null || s.trim().isEmpty());
    }

}
