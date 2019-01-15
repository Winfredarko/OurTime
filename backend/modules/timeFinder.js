const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);


user = {"allUserEvents": [
    {
        "start": "2019-01-17T21:00:00-05:00",
        "end": "2019-01-17T23:00:00-05:00"
    },
    {
        "start": "2019-01-18T13:00:00-05:00",
        "end": "2019-01-18T15:00:00-05:00"
    },
    {
        "start": "2019-01-18T17:00:00-05:00",
        "end": "2019-01-18T21:00:00-05:00"
    },
    {
        "start": "2019-01-19T13:00:00-05:00",
        "end": "2019-01-19T17:00:00-05:00"
    },
    {
        "start": "2019-01-20T09:00:00-05:00",
        "end": "2019-01-20T13:00:00-05:00"
    },
    {
        "start": "2019-01-24T21:00:00-05:00",
        "end": "2019-01-24T23:00:00-05:00"
    },
    {
        "start": "2019-01-25T13:00:00-05:00",
        "end": "2019-01-25T15:00:00-05:00"
    },
    {
        "start": "2019-01-25T17:00:00-05:00",
        "end": "2019-01-25T21:00:00-05:00"
    },
    {
        "start": "2019-01-26T13:00:00-05:00",
        "end": "2019-01-26T17:00:00-05:00"
    },
    {
        "start": "2019-01-31T21:00:00-05:00",
        "end": "2019-01-31T23:00:00-05:00"
    }

]};

function subtractRanges(longRanges, shortRanges)
  {
    // Always return an array
    if(shortRanges.length === 0)
      return longRanges.hasOwnProperty("length")
        ? longRanges
        : [longRanges];

    // Result is empty range
    if(longRanges.length === 0)
      return [];

    if(!longRanges.hasOwnProperty("length"))
      longRanges = [longRanges];

    for(let long in longRanges)
    {
      for(let short in shortRanges)
      {
        longRanges[long] = longRanges[long].subtract(shortRanges[short])
        if(longRanges[long].length === 0)
        {
          // Subtracted an entire range, remove it from list
          longRanges.splice(long, 1);
          shortRanges.splice(0, short);
          return this.subtractRanges(longRanges, shortRanges);
        }
        else if(longRanges[long].length === 1)
        {
          // No subtraction made, but .subtract always returns arrays
          longRanges[long] = longRanges[long][0];
        }
        else
        {
          // Successfully subtracted a subrange, flatten and recurse again
          const flat = [].concat(...longRanges);
          shortRanges.splice(0, short);
          return subtractRanges(flat, shortRanges);
        }
      }
    }
    return longRanges;
  }



/*
duration should be sent in as minutes.
*/
    var startR = new moment("2019-01-15T13:00:00");
    var endR = new moment("2019-01-25T19:00:00");

    var interval = moment.range(startR, endR);
    //console.log(user.allUserEvents)
    //var x = subtractRanges(interval, user.allUserEvents)
   
    //console.log(x)
    /*let day = moment("00:00:00", "HH:mm:ss").range("day");
    let ranges = user.allUserEvents; //[moment("10:00:00", "HH:mm:ss").range("hour"), moment("16:00:00", "HH:mm:ss").range("hour")];
    console.log(subtractRanges(day, ranges))*/
  //  let day = moment("00:00:00", "HH:mm:ss").range("day");
//let ranges = [moment("10:00:00", "HH:mm:ss").range("hour"), moment("16:00:00", "HH:mm:ss").range("hour")];
//console.log(user.allUserEvents[0])
events = []
e = null;
for (i=0; i<user.allUserEvents.length; i++) {
    e = moment.range(user.allUserEvents[i].start, user.allUserEvents[i].end); 
    events.push(e);
}
//console.log(events);
console.log(subtractRanges(interval, events))
//console.log(subtractRanges(interval, user.allUserEvents));


//var answers = findGroupFreeTimes(user, "2019-01-05T13:00:00", "2019-01-30T19:00:00", false, 0);



    //console.log(startR);
    //console.log(endR);
    //console.log(interval);
    /*
    var busyRange = null;
    var startB = null;
    var endB = null;
    //var interva = null;
    // subtracting unusual times 6-8pm

    // subtracting busy times
    intervalAux = [];
    for (var i = 0; i < user.allUserEvents.length; i++)  {

        // startB = new Date(user.allUserEvents[i].start);
        // endB = new Date(user.allUserEvents[i].end);
        var inter  =  user.allUserEvents[i].start.concat("/");
        inter = inter.concat(user.allUserEvents[i].end);
        var busyRange = moment.rangeFromISOString(inter);
        //intervalAux.push(interval.subtract(busyRange));
        interval = interval.subtract(busyRange)
        console.log(interval)
        }
        console.log(interval) */


    








        // var rangeStart = new Date(user.allUserEvents[0].start);
        // //console.log(rangeStart);
        //  var rangeEnd = new Date(user.allUserEvents[0].end);
        //  var busyRange = moment.range(rangeStart, rangeEnd);
        //  //console.log(busyRange.toString())
        //  interval = interval.subtract(busyRange)


        //console.log("THE INTERVAL:")
        //console.log(interval.length);

    // console.log("interval")
    //     console.log(interval)
    //     console.log(interval.length)

    /*
    flatted the nested array.
    */
//    


    /*
        interval is free times between users. If hasDuration == true, return chunks of time greater 
        than or equal to duration. Else return all chunks. 
    */
//     finalFreeTime = [];
//     if (hasDuration){
//         for (var x in interval) {
//             if (x.diff('minutes') >= duration) {
//                 finalFreeTime.append(x.format('LLL'));
//             }
//         }
//     }
//     else {
//         finalFreeTime = interval;
//     }
//     console.log()
//     //console.log(finalFreeTime);
//     return finalFreeTime;
//  }
//for (var x of answers) {




    // console.log(user.allUserEvents);
    // console.log(user.allUserEvents.length)
    // console.log(user.allUserEvents[0])
    // //what I want below
    // console.log(user.allUserEvents[0].start)

//}
function flatten (input) {
    var flattened=[];
    for (var i=0; i<input.length; ++i) {
    var current = input[i];
    for (var j=0; j<current.length; ++j)
        flattened.push(current[j]);
}
return flattened;
}



function test () {
    // var startR = new moment(new Date).format('LLL');
    // var endR = new moment(endRange).format('LLL');
    console.log("TEST!!!!!!!!!!!!!!!!!!!!!")
    const start1 = moment("2019-01-10");
    const end1 = moment("2019-01-24");
    var interval1 = moment.range(start1, end1);
    const start2 = moment("2019-01-12");
    const end2 = moment("2019-01-16");
    // var interval2 = moment.range(start2, end2);
    // console.log("interval1 test ");
    // console.log(interval1.subtract(interval2));
    // console.log("interval1 test ");
    // console.log(interval1);
    // console.log("============ ");

    
    console.log("TEST#4!!!!!!!!!!")
    const start3 = moment("2019-01-14");
    const end3 = moment("2019-01-16");
    var interval3 = moment.range(start3, end3);
    var interval2 = interval1.subtract(interval3);
    console.log(interval2)

    console.log("TEST#5!!!!!!!!!!")
    for (i =0; i < interval2.length; i++) {
        console.log(interval2[i]);
        console.log("break")
    }

    // const start3 = moment("2019-01-25");
    // const end3 = moment("2019-01-30");
    // var interval3 = moment.range(start3, end3);
    // console.log(interval1.subtract(interval3));


}

//test();