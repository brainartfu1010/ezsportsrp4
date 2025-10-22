"use client";

import React, { useState } from "react";
import { Button } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";

interface TeamSetupPanelProps {
  initialPlayers?: any[];
  onPlayersUpdate: (players: any[]) => void;
}

export default function PanelTeamSetup({ 
  initialPlayers = [], 
  onPlayersUpdate 
}: TeamSetupPanelProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: '',
    age: ''
  });

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.position && newPlayer.age) {
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      onPlayersUpdate(updatedPlayers);
      setNewPlayer({ name: '', position: '', age: '' });
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Team Setup
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Add players to your team roster
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h4 className="text-lg font-semibold">Team Roster</h4>
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => {/* Open add player modal */}}
          >
            <PlusIcon className="mr-2 w-4 h-4" /> Add Player
          </Button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Age</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{player.name}</td>
                <td className="p-3">{player.position}</td>
                <td className="p-3">{player.age}</td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500"
                    onClick={() => deletePlayer(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-muted-foreground">
                  No players added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> 
    </div>
  );
}
