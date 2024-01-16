export async function dayBookedInfo(dupConfig) {
    const defaultTimeTable = {
        9: "empty",
        10: "empty",
        11: "empty",
        12: "empty",
        13: "empty",
        14: "empty",
        15: "empty",
        16: "empty",
        17: "empty",
        18: "empty",
        19: "empty",
        20: "empty",
        21: "empty",
        22: "empty",
        23: "empty",
        24: "empty",
        25: "empty",
        26: "empty",
        27: "empty"
    }

    var timeTable = defaultTimeTable;

    dupConfig.bookedInfo.forEach(document => {
        var startTime = parseInt(document.startTime);
        var useTime = parseInt(document.useTime);
        for(var i = startTime; i < startTime + useTime;i++){
            timeTable[i] = document.type;
        }
    });

    //console.log(timeTable);
    return timeTable;
}