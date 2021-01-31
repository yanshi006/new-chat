// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { error } from "firebase-functions/lib/logger";
// //初期化している
// admin.initializeApp();
// //省略しているだけ
// const db = admin.firestore();

// const sendRespons = (respons: functions.Response, statusCode: number, body: any) => {
//   respons.send({
//     statusCode,
//     body: JSON.stringify(body)
//   });
// }

// //req: any, res: anyはtypeScriptの書き方
// export const addDetaset = functions.https.onRequest(async(req: any, res: any) => {
//   if (req.method !== 'POST') {
//     sendRespons(res, 405, {error: 'Invalid Request'})
//   } else {
//     const detaset = req.body;
//     for (const key of Object.keys(detaset)) {
//       const deta = detaset[key];
//       await db.collection('questions').doc(key).set(deta);
//     }
//     sendRespons(res, 200, {message: 'succesfully added detaset'})
//   }
// })