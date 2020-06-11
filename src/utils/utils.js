//判断数组种是否存在某个值
function updateVegetablesCollection(veggies, veggie) {
    var istf
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        istf = false
    } else if (veggies.indexOf(veggie) > -1) {
        istf = true
    }

    return Promise.resolve(istf)
}
//秒转天时分秒
function SecondToDate(msd) {
    var time = msd
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
        }
        else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0 / 8) + "天" + parseInt((parseFloat(time / 3600.0 / 8) -
                parseInt(time / 3600.0 / 8)) * 8) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分钟"
        } else if (time >= 60 * 60 * 24) {
            time = parseInt(time / 3600.0 / 8) + "天" + parseInt((parseFloat(time / 3600.0 / 8) -
                parseInt(time / 3600.0 / 8)) * 8) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分钟"
        }
        else {
            time = parseInt(time) + "秒";
        }
    }

    return time;
}
//开始时间减去结束时间
function timePresupposed(startTime, endTime) {
    var str = startTime; // 日期字符串
    str = str.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date = new Date(str).getTime();

    var str1 = endTime; // 日期字符串
    str1 = str1.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date1 = new Date(str1).getTime();
    console.log(date1 - date)
    return date1 - date
}
export { updateVegetablesCollection, SecondToDate,timePresupposed};
