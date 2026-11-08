import createApp from "./app.ts";
import connectDB from "./utils/db.ts";
import "dotenv/config";
async function main() {
  await connectDB();
  const app = createApp();
  app.listen(5000, () => {
    console.log("connected to localhost:", 5000);
  });
}
main();
