import { useSuspenseQuery } from "@tanstack/react-query";
import { getHunters } from "../api/statistics";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function HomeTable() {
  const { data } = useSuspenseQuery({
    queryKey: ["home-statistics"],
    queryFn: getHunters,
  });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">헌터</TableHead>
          <TableHead className="w-[100px]">1위 비율</TableHead>
          <TableHead className="w-[100px]">픽률</TableHead>
          <TableHead className="w-[100px] text-left">평균 등수</TableHead>
          <TableHead className="w-[100px] text-left">평균 K/D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((hunter) => (
          <TableRow key={hunter.hunter_name}>
            <TableCell className={"flex items-center gap-[10px]"}>
              <img
                className={"w-[25px]"}
                alt={"hunter image"}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReH1nivRV_9yG4wz04xIz1EEh-J69U_2JRaA&s"
                }
              />
              {hunter.hunter_name}
            </TableCell>
            <TableCell>{hunter.win_rate}%</TableCell>
            <TableCell>{hunter.pick_rate}%</TableCell>
            <TableCell>{hunter.average_rank}</TableCell>
            <TableCell>{hunter.average_kd_rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
