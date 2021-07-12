import express from 'express';
import db, { athletes } from './database';
import strava from 'strava-v3';

const app = express();

async function insertUser(
  username: string,
  stravaId: number,
  firstName: string,
  lastName: string,
  sex: string,
  weight: number,
  city: string,
  state: string,
  country: string,
  stravaCreatedAt: Date,
  stravaUpdatedAt: Date
) {
  await athletes(db).insert({
    username,
    strava_id: stravaId,
    firstname: firstName,
    lastname: lastName,
    sex,
    weight,
    city,
    state,
    country,
    strava_created_at: stravaCreatedAt,
    strava_updated_at: stravaUpdatedAt,
  });
}

async function updateUser(username: string, firstName: string) {
  await athletes(db).update({ username }, { firstname: firstName });
}

async function deleteUser(username: string) {
  await athletes(db).delete({ username });
}

async function getUser(username: string) {
  return await athletes(db).findOne({ username });
}
async function run() {
  // await insertUser('me@example.com', 'red');
  // await updateUser('me@example.com', 'blue');
  //
  // const user = await getUser('me@example.com');
  // console.log('user =', user);
  //
  // await deleteUser('me@example.com');
  //
  // await db.dispose();
  // const payload = await strava.athlete.get({});
  // const reqPayload = await strava.oauth.getRequestAccessURL({
  //   scope: 'activity:read',
  // });
  // console.log('req payload', reqPayload);
  const some = await strava.oauth.getToken(
    '51e7879c00d7ed9c44ddc3f059cae2fdc79903fc'
  );
  console.log('get token res', some);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = await strava.athlete.listActivities({
    access_token: some.access_token,
    // before: nowSeconds + 3600,
    // after: nowSeconds + 3600,
  });
  console.log('rate limit exceeded', strava.rateLimiting.exceeded());
  console.log('rate limit fraction', strava.rateLimiting.fractionReached());
  console.log('payload', payload);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send({
    id: 17831213,
    username: 'brandon_eleuterio',
    resource_state: 2,
    firstname: 'Brandon',
    lastname: 'Eleuterio',
  });
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});

//Sample activity data
// {
//     resource_state: 2,
//     athlete: { id: 17831213, resource_state: 1 },
//     name: 'Taking it easy',
//     distance: 9791.7,
//     moving_time: 3601,
//     elapsed_time: 3601,
//     total_elevation_gain: 69,
//     type: 'Run',
//     workout_type: 0,
//     id: 5616000564,
//     external_id: '435904250113966080_20210712073841.fit',
//     upload_id: 5975436549,
//     start_date: '2021-07-12T13:38:41Z',
//     start_date_local: '2021-07-12T07:38:41Z',
//     timezone: '(GMT-07:00) America/Denver',
//     utc_offset: -21600,
//     start_latlng: [ 39.09, -104.88 ],
//     end_latlng: [ 39.09, -104.88 ],
//     location_city: null,
//     location_state: null,
//     location_country: 'United States',
//     start_latitude: 39.09,
//     start_longitude: -104.88,
//     achievement_count: 0,
//     kudos_count: 0,
//     comment_count: 0,
//     athlete_count: 1,
//     photo_count: 0,
//     map: {
//       id: 'a5616000564',
//       summary_polyline: 'qnqmFh{b_SQ}@sBeFe@iBO[WWIEG?k@Vc@@oA\\oAPiALGAEGCUCe@CsEBg@Ei@EiBEo@@eAEcDCq@DmC?kBE}A?sCBSFIx@IlCAl@GFEDIDs@BMFIFEr@GHCXUHCTA~@?f@Kt@IbBY`D{@vEsAdFqAhBk@bIoBvC{@dBo@rL_FjCqAhDyAjDeBzAo@rFqCzEwBxC}AvB{@zBo@rCi@|Dc@hAOvAMlC]rAK~@K`Fa@bDQv@GbBSlD[dEg@zHs@dAMjEc@lCWfIm@vEg@fAEnAl@D@?AoAo@QCuAPmDXcCPq@?cAN}CVaD`@eCP{ARiHn@oC^}Eb@}BXgABgHr@iDRoBXsBRa@H{DZcALmCd@mBh@{@ZgKbFgF~BuDhB}FhC{@\\cF`CiBx@yAj@c@L}@d@iBt@oExA_Dr@cAZcB^cAXiBb@oA`@aB`@_ElAcGvA{ANKJMZGBOB{AAs@DIDGHEPCh@CHKJ}@FsB@cARCLHrG?tEDlFAr@Dn@@nAAnDBz@@bABd@Fd@DHF@d@IlAKb@I',
//       resource_state: 2
//     },
//     trainer: false,
//     commute: false,
//     manual: false,
//     private: false,
//     visibility: 'everyone',
//     flagged: false,
//     gear_id: 'g8426187',
//     from_accepted_tag: false,
//     upload_id_str: '5975436549',
//     average_speed: 2.719,
//     max_speed: 3.4,
//     average_cadence: 90.2,
//     has_heartrate: true,
//     average_heartrate: 129.9,
//     max_heartrate: 136,
//     heartrate_opt_out: false,
//     display_hide_heartrate_option: true,
//     max_watts: 232,
//     elev_high: 2131,
//     elev_low: 2078,
//     pr_count: 0,
//     total_photo_count: 0,
//     has_kudoed: false,
//     suffer_score: 15
//   }
