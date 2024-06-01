import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleGame } from '../../../api/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <GameForm gameObj={editGame} user={user} />
  );
}
