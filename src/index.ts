import express from 'express';
import db, {users} from './database';

const app = express();

async function insertUser(email: string, favoriteColor: string) {
  await users(db).insert({email, favorite_color: favoriteColor});
}

async function updateUser(email: string, favoriteColor: string) {
  await users(db).update({email}, {favorite_color: favoriteColor});
}

async function deleteUser(email: string) {
  await users(db).delete({email});
}

async function getUser(email: string) {
  return await users(db).findOne({email});
}
async function run() {
  await insertUser('me@example.com', 'red');
  await updateUser('me@example.com', 'blue');

  const user = await getUser('me@example.com');
  console.log('user =', user);

  await deleteUser('me@example.com');

  await db.dispose();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

app.get('/', (req, res) => {


  res.send({
    "id": 17831213,
    "username": "brandon_eleuterio",
    "resource_state": 2,
    "firstname": "Brandon",
    "lastname": "Eleuterio",
  });
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
