var logger = [];

// global!
Battle = {
  resolveBattle,
  getLogs
}

function getLogs() {
    return logger;
}

function resolveBattle(sideA, sideB) {
    logger = []; //temporary
    var melees = [];
    var roundNumber = 0;

    while (melees.length || (sideA.length && sideB.length)) {
        logger.push(`Zaczyna się runda ${++roundNumber} bitwy.`);
        melees = battleRound(sideA, sideB, melees)
    }
}

function newMelees(sideA, sideB) {
    var newMelees = [];
    while (sideA.length && sideB.length) {
      var newMelee = {
        sideA: sideA.shift(),
        sideB: sideB.shift()
      };
      newMelees.push(newMelee);
      logger.push(`Ścierają się ${newMelee.sideA.name} oraz ${newMelee.sideB.name}.`);
    }
    return newMelees;
}

function battleRound(sideA, sideB, melees) {
    var currentMelees = melees.concat(newMelees(sideA, sideB));
    var lastingMelees = [];
    currentMelees.forEach(function(melee) {
        unitClash(melee.sideA, melee.sideB);
        if (!melee.sideA.eliminated && !melee.sideB.eliminated) {
            lastingMelees.push(melee);
        } else if (!melee.sideA.eliminated) {
            sideA.push(melee.sideA);
        } else if (!melee.sideB.eliminated) {
            sideB.push(melee.sideB);
        }
    });
    return lastingMelees;
}

function unitClash(unitA, unitB) {
    checkOutnumber(unitA, unitB);
    checkOutnumber(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkOutmanuever(unitA, unitB);
    checkOutmanuever(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkOutlast(unitA, unitB);
    checkOutlast(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkOverpower(unitA, unitB);
    checkOverpower(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkBroken(unitA, unitB);
    checkBroken(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkAttrition(unitA, unitB);
    checkAttrition(unitB, unitA);
    if (checkPairEliminated(unitA, unitB)) return;
    checkFatigue(unitA);
    checkFatigue(unitB);
    if (checkPairEliminated(unitA, unitB)) return;
    // continue
    return true;
}

function checkPairEliminated(unitA, unitB) {
  unitA.eliminated = checkUnitEliminated(unitA);
  unitB.eliminated = checkUnitEliminated(unitB);
  return unitA.eliminated || unitB.eliminated;
}

function checkUnitEliminated(unitA) {
  if (!unitA.white) {
    logger.push(`Złamane morale i formacja w strzępach, oddział ${unitA.name} rozpierzchł się.`);
    return true;
  }
  if (!unitA.blue) {
    logger.push(`Osaczony i bez odpowiedniego dowodzenia, oddział ${unitA.name} odłączył się od bitwy w zamieszaniu.`);
    return true;
  }
  if (!unitA.black) {
    logger.push(`Zbyt wielu rannych i zniszczony sprzęt zmusiły ${unitA.name} do wycofania się.`);
    return true;
  }
  if (!unitA.red) {
    logger.push(`Opadnięty z sił i niezdolny do dalszej walki, oddział ${unitA.name} został rozgoniony.`);
    return true;
  }
  if (!unitA.green) {
    if (unitA.monster) {
      logger.push(`Powalony ciężkimi ranami ${unitA.name} padł, jego dalszy los pozostaje niepewny.`);
      return true;
    }
    logger.push(`Zdziesiątkowane w walce, resztki oddziału ${unitA.name} zmieszały się z chaosem bitwy.`);
    return true;
  }
}

function checkOutnumber(unitA, unitB) {
  if (unitA.green < unitB.green) {
    if (unitA.cavalry && unitB.infantry) {
      logger.push(`${unitA.name} is safe from enemy numbers with distance`);
      return;
    }
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} is safe from distance`);
      return;
    }
    if (unitA.flamebreathing && unitB.monster) {
      logger.push(`${unitA.name} fiery breath disperses enemy numbers`);
      return;
    }
    if (unitA.demon && !unitB.demon && !unitB.sealer) {
      logger.push(`${unitA.name} demonic energy keeps enemy numbers at bay`);
      return;
    }
    unitA.blue -= 1;
    unitA.black -= 1;
    logger.push(`${unitB.name} outnumbers ${unitA.name}`);
  }
}
function checkOutmanuever(unitA, unitB) {
  if (unitA.blue < unitB.blue) {
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} ignores enemy tactics with distance`);
      return;
    }
    if (unitA.flying && !unitB.flying) {
      logger.push(`${unitA.name} flies over enemy manuevers`);
      return;
    }
    unitA.white -= 1;
    unitA.red -= 1;
    logger.push(`${unitB.name} outmanuevers ${unitA.name}`);
  }
}
function checkOutlast(unitA, unitB) {
  if (unitA.red < unitB.white) {
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} safely continues ranged attack despite enemy toughness`);
      return;
    }
    if (unitA.monster && !unitB.monster) {
      logger.push(`${unitA.name} monstrous mass ignores enemy armor`);
      return;
    }
    if (unitA.slayer && unitB.monster) {
      logger.push(`${unitA.name} sklillful technique hits beast soft spot`);
      return;
    }
    unitA.black -= 1;
    logger.push(`${unitA.name} is unable to break through ${unitB.name} defense`);
  }
}
function checkOverpower(unitA, unitB) {
  if (unitA.white < unitB.red) {
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} is safe from enemy weapons with distance`);
      return;
    }
    if (unitA.necro && !unitB.monster) {
      logger.push(`${unitA.name} regenerates from taken casualties`);
      return;
    }
    if (unitA.demon && !unitB.demon && !unitB.sealer) {
      logger.push(`enemy weapons have no effect on ${unitA.name} demonic flesh`);
      return;
    }
    unitA.green -= 1;
    logger.push(`${unitA.name} is taking heavy casualties`);
  }
}
function checkBroken(unitA, unitB) {
  if (unitA.white < unitB.black) {
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} is not intimidated from distance`);
      return;
    }
    if (unitA.machine) {
      logger.push(`${unitA.name} feels no fear from the enemy`);
      return;
    }
    unitA.green -= 1;
    logger.push(`${unitA.name} is being terrorized by ${unitB.name}`);
  }
}
function checkAttrition(unitA, unitB) {
  if (unitA.black < unitB.black) {
    if (unitA.ranged && !unitA.hasBeenInCombat && !unitB.ranged) {
      logger.push(`${unitA.name} is no taking attrition from a safe distance`);
      return;
    }
    if (unitA.demon && !unitB.demon && !unitB.sealer) {
      logger.push(`it seems ${unitA.name} is immune to most deadly techniques`);
      return;
    }
    unitA.white -= 1;
    logger.push(`${unitA.name} losing defense as a result of attrition`);
  }
}
function checkFatigue(unitA) {
  if (!unitA.hasBeenInCombat && unitA.ranged) {
    logger.push(`${unitA.name} lost it's distance from the enemy`);
  }
  unitA.hasBeenInCombat = true;
  unitA.white -= 1;
  unitA.blue -= 1;
  unitA.black -= 1;
  unitA.red -= 1;
  unitA.green -= 1;
  logger.push(`${unitA.name} is fatigued with the long combat`);
}
