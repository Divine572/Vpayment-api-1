import { Injectable } from '@nestjs/common';

@Injectable()
export class CardsService {}

//how to use axios in nodejs?
// async function getTrailById(trailId: number): Promise<string> {
//     console.log("Entered the method.");
//     try {
//       const res = await axios.get("https://reqres.in/api/users?page=2");
//       console.log("inside then");
//       return res.data;
//     } catch {
//       console.log("inside catch");
//       return "this is not good, inner catch";
//     }
// }

// // ...in some other async function
// const trail = await getTrailById(trailId)
