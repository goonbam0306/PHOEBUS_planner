export async function dayBookedInfo(dupConfig) {
    const defaultTimeTable = {
        9: ["empty", "info"],
        10: ["empty", "info"],
        11: ["empty", "info"],
        12: ["empty", "info"],
        13: ["empty", "info"],
        14: ["empty", "info"],
        15: ["empty", "info"],
        16: ["empty", "info"],
        17: ["empty", "info"],
        18: ["empty", "info"],
        19: ["empty", "info"],
        20: ["empty", "info"],
        21: ["empty", "info"],
        22: ["empty", "info"],
        23: ["empty", "info"],
        24: ["empty", "info"],
        25: ["empty", "info"],
        26: ["empty", "info"],
        27: ["empty", "info"]
    }

    var timeTable = defaultTimeTable;

    dupConfig.bookedInfo.forEach(document => {
        var startTime = parseInt(document.startTime);
        var useTime = parseInt(document.useTime);
        timeTable[startTime][1] = document.info;
        for(var i = startTime; i < startTime + useTime;i++){
            timeTable[i][0] = document.type;
        }
    });

    //console.log(timeTable);
    return timeTable;
}