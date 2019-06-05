import firebaseDateToDate from '../common/dateFns/firebaseDateToDate';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

// Refuelling rules:
// 1. If I have a full tank and consume some fuel, the next refuelling's liters
//    amount is how many fuel I consumed on the refuelling IF I have a new full tank.
// 2. If a refuelling doesn't have a full tank, I can't determine how many liters
//    were consumed because the next refuelling's liters amount doesn't reflect the
//    reality of consumed liters
// 3. If a refuelling's next refuelling doesn't have a full tank, I can't determine
//    the amount of consumed liters because it will be lesser than the real amount of
//    consumed liters
// 4. The cost per Km considers the amount of consumed liters (the next refuelling's
//    liters amount) to show the real cost for the current refuelling
const processRefuellingList = (acc, refuelling, index, array) => {
  const nextRefuelling = array[index - 1];

  let extendedData;
  if (nextRefuelling) {
    const distance = nextRefuelling.odometer - refuelling.odometer;
    const nextRefuellingDate = firebaseDateToDate(nextRefuelling.date);
    const refuellingDate = firebaseDateToDate(refuelling.date);
    const days = differenceInCalendarDays(nextRefuellingDate, refuellingDate);
    const dailyDistance = distance / days;

    let distancePerLiter = 0;
    let costPerKm = 0;
    if (refuelling.fullTank && nextRefuelling.fullTank) {
      distancePerLiter = distance / nextRefuelling.liters;
      costPerKm = (nextRefuelling.liters * refuelling.price) / distance;
    }

    extendedData = {
      distance,
      dailyDistance: dailyDistance,
      distancePerLiter: distancePerLiter,
      costPerKm: costPerKm,
    }
  } else {
    extendedData = {
      distance: 0,
      dailyDistance: 0,
      distancePerLiter: 0,
      costPerKm: 0,
    }
  }

  return [
    ...acc,
    {
      ...refuelling,
      ...extendedData,
    }
  ]
};

const getRefuelings = rawList =>
  [...rawList]
    .sort((a, b) => b.odometer - a.odometer)
    .reduce(processRefuellingList, []);

export {
  getRefuelings,
};
