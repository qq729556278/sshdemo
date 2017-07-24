package com.joey.tools;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateTool {

    private final static String FORMAT_DAY = "yyyy-MM-dd";

    // ���ڼ���
    public static String getBeforeDate(Date date, int days) {
        SimpleDateFormat df = new SimpleDateFormat(FORMAT_DAY);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR)
                - days);
        return df.format(calendar.getTime());
    }

    // ���ڼ���
    public static String getAfterDate(Date date, int days) {
        SimpleDateFormat df = new SimpleDateFormat(FORMAT_DAY);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR)
                + days);
        return df.format(calendar.getTime());
    }

    // ��ȡ�µĵ�һ��
    public static Date getMonthFirstDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        return calendar.getTime();
    }

    // ��ȡ�µ����һ��
    public static Date getMonthLastDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        // ������Ϊ�¸��µ�һ��
        calendar.add(Calendar.MONTH, 1);// ��һ����
        calendar.set(Calendar.DATE, 1); // ����Ϊ���µ�һ��
        calendar.add(Calendar.DATE, -1);// �ټ�һ�켴Ϊ�ϸ������һ��
        // ����ʱ����
        //calendar.set(Calendar.HOUR, 23);
        //calendar.set(Calendar.MINUTE, 59);
        //calendar.set(Calendar.SECOND, 59);
        return calendar.getTime();
    }

    //���·�
    public static Date getBeforeMonth(Date date, int months) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) - months);
        return calendar.getTime();
    }

    //���·�
    public static Date getAfterMonth(Date date, int months) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) + months);
        return calendar.getTime();
    }

    /**
     * ��ȡϵͳʱ�� yyyy-MM-dd HH:mm:ss
     *
     * @return Timestamp
     */
    public static Timestamp getSystemTimestamp() {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return Timestamp.valueOf(sd.format(Calendar.getInstance().getTime()));
    }

}
