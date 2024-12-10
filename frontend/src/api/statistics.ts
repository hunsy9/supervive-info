import { HunterQueryData } from "./types";
import apiInstance from "./index";

export const getHunters = async (): Promise<HunterQueryData[]> => {
  const res = await apiInstance.get<HunterQueryData[]>("hunter_statistics");

  return res.data ?? [];
  // return [
  //   {
  //     id: 8,
  //     hunter_avatar: "asdfadfasd",
  //     hunter_name: "hunster",
  //     win_rate: 9999.2,
  //     pick_rate: 1.2,
  //     average_rank: 3,
  //     average_kd_rate: 1.2,
  //     meta_tag: "SQUAD",
  //   },
  //   {
  //     id: 9,
  //     hunter_avatar: "asdfadfasd",
  //     hunter_name: "hunster",
  //     win_rate: 0.1,
  //     pick_rate: 1.2,
  //     average_rank: 3,
  //     average_kd_rate: 1.2,
  //     meta_tag: "SQUAD",
  //   },
  //   {
  //     id: 10,
  //     hunter_avatar: "asdfadfasd",
  //     hunter_name: "hunster",
  //     win_rate: 0.1,
  //     pick_rate: 1.2,
  //     average_rank: 3,
  //     average_kd_rate: 1.2,
  //     meta_tag: "SQUAD",
  //   },
  // ];
};
