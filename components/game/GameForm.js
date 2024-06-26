import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../api/gameData';

const initialState = {
  maker: '',
  numberOfPlayers: '',
  title: '',
  skillLevel: 1,
  gameTypeId: 0,
};

const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        title: obj.title,
        maker: obj.maker,
        skillLevel: obj.skill_level,
        numberOfPlayers: obj.number_of_players,
        gameType: obj.game_type.id,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      id: obj.id,
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    if (obj?.id) {
      game.id = obj.id;
      updateGame(game).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" type="number" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" type="number" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Game Type"
            name="gameTypeId"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameTypeId}
            required
          >
            <option value="">Select a Game Type</option>
            {gameTypes?.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>
                {gameType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    id: PropTypes.number,
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
