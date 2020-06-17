//判断数组种是否存在某个值
function updateVegetablesCollection(veggies, veggie) {
    var istf
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        istf = false
    } else if (veggies.indexOf(veggie) > -1) {
        istf = true
    }
    console.log(istf)
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
function countDown(startTime, endTime) {
    // 开始时间
    var s = 0;
    var hour = startTime.split(':')[0];
    var min = startTime.split(':')[1];
    var sec = startTime.split(':')[2];
    s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    //结束时间
    var j = 0;
    var hour = endTime.split(':')[0];
    var min = endTime.split(':')[1];
    var sec = endTime.split(':')[2];
    j = Number(hour * 3600) + Number(min * 60) + Number(sec);
    
    return SecondToDate(s-j)
    // return s;

}
export { updateVegetablesCollection, SecondToDate,countDown};
