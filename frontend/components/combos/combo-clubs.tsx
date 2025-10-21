// "use client";
// import { Select } from "antd";
// import { useClubs } from "@/hooks/useClubs";

// interface ComboClubsProps {
//   value?: number;
//   onChange?: (v: number) => void;
// }

// export default function ComboClubs({ value, onChange }: ComboClubsProps) {
//   const { clubs, isLoading } = useClubs();

//   return (
//     <Select
//       value={value}
//       onChange={onChange}
//       placeholder="Select club"
//       loading={isLoading}
//       style={{ width: "100%" }}
//     >
//       {clubs.map((c) => (
//         <Select.Option key={c.id} value={c.id}>
//           {c.name}
//         </Select.Option>
//       ))}
//     </Select>
//   );
// }
