'use strict';


// ported from #201 (not-merged yet)
const zip = (arr, ...args) =>
    arr.map((val, idx) => args.reduce((x, xs) => [...x, xs[idx]], [val]));

const sumBy = (arr, key) =>
    arr.reduce((total, item) => total + item[key], 0);



/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {Array<Arm>} arm list with "count"
 */
const armListWithCount = (arml, comb) => zip(arml, comb).map(([arm, count]) => Object.assign({}, arm, {count}));

/**
 * TODO: how to document Types for "higher-order function"
 */
const genCountWeaponFunc = (func) => (arml, comb) => sumBy(armListWithCount(arml, comb).filter(func), "count");


// #326 discussion for how to detect epic weapon
const isEpicWeapon = (arm) => arm.series === "epic";


const isWandType = (arm) => arm.armType === "wand";


// public

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} count of epic weapon
 */
const countEpicWeapon = genCountWeaponFunc(isEpicWeapon);

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} count of wand type weapon
 */
const countWandType = genCountWeaponFunc(isWandType);

/**
 * @param {Array<number>} comb combinations
 * @return {boolean} is all unique arm
 */
const isAllUniqueArm = (comb) => comb.filter(x => x > 0).every(1);

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {number} is all unique arm type
 */
const countUniqueArmType = (arml, comb) => (new Set(armListWithCount(arml, comb).filter(arm => arm.count > 0).map(arm => arm.armType))).size;

/**
 * @param {Array<number>} comb combinations
 * @return {number} count unique arm
 */
const countUniqueComb = (comb) => comb.filter(x => x == 1).length;

/**
 * @param {Array<Arm>} arml arm list
 * @param {Array<number>} comb combinations
 * @return {boolean} is all unique arm type
 */
const isAllUniqueArmType = (arml, comb) => countUniqueArmType(arml, comb) === countUniqueComb(comb);

// FIXME: it is not enough completed implementation, yet.
// - if arml contained blank data
// - if comb contained value 0

// FIXME: this logic can't check following:
// - if same weapon was added as different item, with different Lv or plug bonus etc.
// - Omega, JMP, different colors can be different weapon? Cosmos types too.


module.exports = {
    // private
    isEpicWeapon: isEpicWeapon,
    isWandType: isWandType,
    // public
    countEpicWeapon: countEpicWeapon,
    countWandType: countWandType,
    isAllUniqueArm: isAllUniqueArm,
    countUniqueArmType: countUniqueArmType,
    countUniqueComb: countUniqueComb,
    isAllUniqueArmType: isAllUniqueArmType,
};