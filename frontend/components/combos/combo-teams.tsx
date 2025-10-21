// "use client";
// import { Select, Spin } from "antd";
// import { useTeams } from "@/hooks/useTeams";

// interface ComboTeamsProps {
//   clubId?: number;
//   value?: number;
//   onChange?: (v: number) => void;
// }

// export default function ComboTeams({ clubId, value, onChange }: ComboTeamsProps) {
//   const { teams, isLoading } = useTeams(clubId);

//   return (
//     <Select
//       value={value}
//       onChange={onChange}
//       placeholder={clubId ? "Select team" : "Select club first"}
//       disabled={!clubId}
//       loading={isLoading}
//       notFoundContent={isLoading ? <Spin size="small" /> : "No teams found"}
//       style={{ width: "100%" }}
//     >
//       {teams.map((t) => (
//         <Select.Option key={t.id} value={t.id}>
//           {t.name}
//         </Select.Option>
//       ))}
//     </Select>
//   );
// }
