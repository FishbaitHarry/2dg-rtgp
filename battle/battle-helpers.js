var logger = [];

// global!
Battle = {
  unitClash,
  getLogs
}

function getLogs() {
    return logger;
}

function unitClash(unitA, unitB) {
    logger = []; //temporary
    checkOutnumber(unitA, unitB);
    checkOutnumber(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkOutmanuever(unitA, unitB);
    checkOutmanuever(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkOutlast(unitA, unitB);
    checkOutlast(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkOverpower(unitA, unitB);
    checkOverpower(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkBroken(unitA, unitB);
    checkBroken(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkAttrition(unitA, unitB);
    checkAttrition(unitB, unitA);
    if (checkEliminated(unitA, unitB)) return;
    checkFatigue(unitA);
    checkFatigue(unitB);
}

function checkEliminated(unitA, unitB) {
  return !(unitA.white && unitA.blue && unitA.black && unitA.red && unitA.black)
    || (unitB && checkEliminated(unitB));
}
function checkOutnumber(unitA, unitB) {
  if (unitA.green < unitB.green) {
    unitA.blue -= 1;
    unitA.black -= 1;
    logger.push(`${unitB.name} outnumbers ${unitA.name}`);
  }
}
function checkOutmanuever(unitA, unitB) {
  if (unitA.blue < unitB.blue) {
    unitA.white -= 1;
    unitA.red -= 1;
    logger.push(`${unitB.name} outmanuevers ${unitA.name}`);
  }
}
function checkOutlast(unitA, unitB) {
  if (unitA.red < unitB.white) {
    unitA.black -= 1;
    logger.push(`${unitA.name} is unable to break through ${unitB.name} defense`);
  }
}
function checkOverpower(unitA, unitB) {
  if (unitA.white < unitB.red) {
    unitA.green -= 1;
    logger.push(`${unitA.name} is taking heavy casualties`);
  }
}
function checkBroken(unitA, unitB) {
  if (unitA.white < unitB.black) {
    unitA.green -= 1;
    logger.push(`${unitA.name} is being terrorized by ${unitB.name}`);
  }
}
function checkAttrition(unitA, unitB) {
  if (unitA.black < unitB.black) {
    unitA.white -= 1;
    logger.push(`${unitA.name} losing defense as a result of attrition`);
  }
}
function checkFatigue(unitA) {
  unitA.white -= 1;
  unitA.blue -= 1;
  unitA.black -= 1;
  unitA.red -= 1;
  unitA.green -= 1;
  logger.push(`${unitA.name} is fatigued with the long combat`);
}
