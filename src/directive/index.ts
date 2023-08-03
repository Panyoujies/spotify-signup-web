//index.js 该文件内存放所有自定义指令

/* 时间格式化 没分钟、每小时 */
import time from './time';

export default function directive(app){
    app.directive('time', time);
}