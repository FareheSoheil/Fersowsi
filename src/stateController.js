import express from 'express';
import sqlite from 'sqlite';
import { databasePath } from './sqliteManager';
import { updateQuery, deleteQuery, selectQuery } from './constants';

const router = express.Router();
const dbPromise = sqlite.open(databasePath, { Promise });
const SUCCESS = 'success';
const FAIL = 'error';

// ==================== START OF FUNCTIONS ==============================
async function updateState(data) {
  let result = '';
  try {
    const pk = data.TokenId;
    const newState = JSON.stringify(data);
    const db = await dbPromise;
    await Promise.all([db.run(updateQuery, pk, newState)]);
    result = {
      status: SUCCESS,
    };
  } catch (error) {
    result = {
      status: FAIL,
      payload: error,
    };
  }
  return result;
}
async function removeState(id) {
  let result = '';
  try {
    const db = await dbPromise;
    await Promise.all([db.run(deleteQuery, id)]);
    result = {
      status: SUCCESS,
    };
  } catch (error) {
    result = {
      status: FAIL,
      payload: error,
    };
  }
  return result;
}
// ==================== ENDING OF FUNCTIONS ==============================

// ==================== STARTING OF CONTROLLERS  ==============================
router.post('/setState', async (req, res, next) => {
  const result = await updateState(req.body);
  res.send(result);
});
router.post('/getState', async (req, res, next) => {
  let result = '';
  try {
    const db = await dbPromise;
    const state = await Promise.all([db.get(selectQuery, req.body.idToken)]);
    if (state[0] === undefined) {
      window.alert("no state found");
      console.log("no state found");
      result = {
        status: 'error',
        payload: 'IdToken Not Valid',
      };
    } else {
      result = {
        status: SUCCESS,
        payload: JSON.parse(state[0].state),
      };
    }
  } catch (error) {
    result = {
      status: 'error',
      payload: error,
    };
  }
  res.send(result);
});
router.post('/removeState', async (req, res, next) => {
  const pk = req.body.idToken;
  const result = await removeState(pk);
  res.send(result);
});
// ==================== ENDING OF CONTROLLERS  ==============================

export default router;
