"use client";

import { useState } from "react";
import { Card } from "@/components/controls/card";
import Table from "@/components/controls/table";
import Toolbar from "@/components/controls/toolbar";
import Button, { Buttons } from "@/components/controls/button";
import { UserIcon } from "lucide-react";
import ModalSportEdit from "@/components/modals/modal-sport-edit";

export default function AdminDashboardPage() {
  const [data, setData] = useState([
    { id: 1, name: "John Doe 1", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Doe 2", email: "jane.doe@example.com", role: "User" },
    { id: 3, name: "John Doe 3", email: "john.doe@example.com", role: "Admin" },
    { id: 4, name: "Jane Doe 4", email: "jane.doe@example.com", role: "User" },
    { id: 5, name: "John Doe 5", email: "john.doe@example.com", role: "Admin" },
    { id: 6, name: "Jane Doe 6", email: "jane.doe@example.com", role: "User" },
    { id: 7, name: "John Doe 7", email: "john.doe@example.com", role: "Admin" },
    { id: 8, name: "Jane Doe 8", email: "jane.doe@example.com", role: "User" },
    { id: 9, name: "John Doe 9", email: "john.doe@example.com", role: "Admin" },
    {
      id: 10,
      name: "Jane Doe 10",
      email: "jane.doe@example.com",
      role: "User",
    },
    {
      id: 11,
      name: "John Doe 11",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 12,
      name: "Jane Doe 12",
      email: "jane.doe@example.com",
      role: "User",
    },
    {
      id: 13,
      name: "John Doe 13",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 14,
      name: "Jane Doe 14",
      email: "jane.doe@example.com",
      role: "User",
    },
    {
      id: 15,
      name: "John Doe 15",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 16,
      name: "Jane Doe 16",
      email: "jane.doe@example.com",
      role: "User",
    },
    {
      id: 17,
      name: "John Doe 17",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 18,
      name: "Jane Doe 18",
      email: "jane.doe@example.com",
      role: "User",
    },
    {
      id: 19,
      name: "John Doe 19",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 20,
      name: "Jane Doe 20",
      email: "jane.doe@example.com",
      role: "User",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleReorder = (
    newOrders: Array<{ [key: string]: number }>,
    newData?: typeof data
  ) => {
    console.log("Reorder configuration:", newOrders);
    setData(newData ?? data);
  };

  const handleAdd = () => {
    setOpenModal(true);
  };

  const cols = [
    { header: "Namesssssss", accessor: "name" as keyof (typeof data)[0] },
    { header: "Email", accessor: "email" as keyof (typeof data)[0] },
    { header: "Role", accessor: "role" as keyof (typeof data)[0] },
  ];

  return (
    <>
      <Card title="Users" note="Manage users" icon={<UserIcon />}>
        <Toolbar
          start={
            <p className="text-muted-foreground text-sm">Manage your sports.</p>
          }
          end={
            <>
              <Buttons.Delete onClick={handleAdd} />
              <Buttons.Add onClick={handleAdd} />
            </>
          }
        />
        <Table
          cols={cols}
          data={data}
          onReorder={handleReorder}
          actions={{
            onEdit: (id) => setOpenModal(true),
            onDelete: (id) => console.log(id),
          }}
        />
      </Card>

      <ModalSportEdit 
        isOpen={openModal} 
        onOpenChange={setOpenModal} 
        onSave={(sports) => {
          console.log('Saved sports:', sports);
          setOpenModal(false);
        }} 
      />
    </>
  );
}
