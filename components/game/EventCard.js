import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description,
  date,
  time,

}) => (
  <Card className="text-center">
    <Card.Header>{description}</Card.Header>
    <Card.Body>
      <Card.Title>Time: {time}</Card.Title>
    </Card.Body>
    <Card.Footer className="text-muted">Date: {date}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,

};

export default EventCard;
