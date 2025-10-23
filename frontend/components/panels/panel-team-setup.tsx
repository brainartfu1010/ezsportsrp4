"use client";

import React, { useState } from "react";
import { Button, Buttons } from "@/components/controls/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import Table from "../controls/table";

interface TeamSetupPanelProps {
  initialPlayers?: any[];
  onPlayersUpdate: (players: any[]) => void;
}

export default function PanelTeamSetup({
  initialPlayers = [],
  onPlayersUpdate,
}: TeamSetupPanelProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    age: "",
  });

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.position && newPlayer.age) {
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      onPlayersUpdate(updatedPlayers);
      setNewPlayer({ name: "", position: "", age: "" });
    }
  };

  const deletePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    onPlayersUpdate(updatedPlayers);
  };

  const handlePlayersUpdate = (updatedPlayers: any[]) => {
    // Validate players data if needed
    onPlayersUpdate(updatedPlayers);
  };

  const cols = [
    { accessor: "name", header: "Name" },
    { accessor: "position", header: "Position" },
    { accessor: "jersey", header: "Jersey" },
    { accessor: "email", header: "Email" },
    { accessor: "gender", header: "Gender" },
    { accessor: "phone", header: "Phone" },
    {
      accessor: "actions",
      header: "Actions",
      cell: (row: any) => (
        <Buttons.DeleteConfirm
          onYes={() => deletePlayer(row.id)}
          children=" "
          size="sm"
          variant="link"
          className="cursor-pointer text-red-500 hover:text-red-700"
        />
      ),
    },
  ];
  const rows = [
    {
      id: 1,
      name: "John Doe",
      position: "Forward",
      jersey: 10,
      gender: "Male",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      position: "Defense",
      jersey: 11,
      gender: "Female",
      email: "jane.doe@example.com",
      phone: "1234567890",
    },
    {
      id: 3,
      name: "Jim Beam",
      position: "Midfielder",
      jersey: 12,
      gender: "Male",
      email: "jim.beam@example.com",
      phone: "1234567890",
    },
    {
      id: 4,
      name: "Jill Johnson",
      position: "Forward",
      jersey: 13,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 5,
      name: "Jack Smith",
      position: "Defense",
      jersey: 14,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 6,
      name: "Jill Johnson",
      position: "Midfielder",
      jersey: 15,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 7,
      name: "Jack Smith",
      position: "Forward",
      jersey: 16,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 8,
      name: "Jill Johnson",
      position: "Defense",
      jersey: 17,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 9,
      name: "Jack Smith",
      position: "Midfielder",
      jersey: 18,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 10,
      name: "Jill Johnson",
      position: "Forward",
      jersey: 19,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 11,
      name: "Jack Smith",
      position: "Defense",
      jersey: 20,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 12,
      name: "Jill Johnson",
      position: "Midfielder",
      jersey: 21,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 13,
      name: "Jack Smith",
      position: "Forward",
      jersey: 22,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 14,
      name: "Jill Johnson",
      position: "Defense",
      jersey: 23,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
    {
      id: 15,
      name: "Jack Smith",
      position: "Midfielder",
      jersey: 24,
      gender: "Male",
      email: "jack.smith@example.com",
      phone: "1234567890",
    },
    {
      id: 16,
      name: "Jill Johnson",
      position: "Forward",
      jersey: 25,
      gender: "Female",
      email: "jill.johnson@example.com",
      phone: "1234567890",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">Team Setup</h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Add players to your team roster
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h4 className="text-lg font-semibold">Team Roster</h4>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              /* Open add player modal */
            }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Player
          </Button>
        </div>

        <div className="p-4 pt-0">
          <Table
            cols={cols as any}
            data={rows}
            draggable={false}
            rowsPerPage={5}
          />
        </div>
      </div>
    </div>
  );
}
