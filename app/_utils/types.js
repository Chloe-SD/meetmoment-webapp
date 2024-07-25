// src/types.js

//More for my information than anything else, this is the structure of the types used 
// in the android React Native app. 
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} TimeBlock
 * @property {string} start - start time (will shift depending on if half hour or hour times)
 * @property {string} end - end time
 * @property {boolean} available - is this time slot selected as available?
 * @property {boolean} selectable - used to make original creator blocks only selectable blocks
 */

/**
 * @typedef {Object} Day
 * @property {string} date - month-day (example "07-22")
 * @property {TimeBlock[]} blocks - The blocks contained in this day
 */

/**
 * @typedef {Object} Meeting
 * @property {string} id
 * @property {string} title
 * @property {string} creatorEmail
 * @property {Participant[]} participants
 * @property {Day[]} days
 * @property {('pending'|'confirmed'|'cancelled')} status
 * @property {Object.<string, Day[]>} participantAvailability
 */

/**
 * @typedef {Object} Participant
 * @property {string} email
 * @property {('pending'|'submitted'|'confirmed')} status
 */


export const Types = {
    User: null,
    TimeBlock: null,
    Day: null,
    Meeting: null,
    Participant: null
  };