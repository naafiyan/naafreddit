import { Updoot } from "../entities/Updoot";
import DataLoader from "dataloader";
// [{postId: 5, userId:10}]
// then return {postId: 5, userId: 10, value: 1}
export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any); // one sql query to get all users
      const updootIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
      // returns array of Users
    }
  );
