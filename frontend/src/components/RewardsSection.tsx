import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const RewardsSection: React.FC = () => {
  const leaderboardData = [
    { id: 1, name: 'Usuario 1', points: 1000 },
    { id: 2, name: 'Usuario 2', points: 900 },
    { id: 3, name: 'Usuario 3', points: 800 },
  ];

  return (
    <div>
      <h2>Recompensas</h2>
      <h3>Leaderboard</h3>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RewardsSection;
