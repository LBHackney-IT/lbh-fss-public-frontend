import React from 'react';
import styled from "styled-components";
import { Card } from "../../util/styled-components/Card";

const ServiceCard = ({ service, onClick }) => {
    let hero = "";
    if (service.images && service.images.medium.length) {
        hero = service.images.medium;
    }

    const select = e => {
        onClick(service.id);
    }

    return (
        <Card modifiers="serviceCard" id={service.id} className="card" onClick={select}>
            {hero.length ? (
                <div className="image-container">
                    <img src={hero} alt={service.name} />
                </div>
            ) : ""}
            <div className="card--container">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
                <p className="service--distance">Distance: <a href="#">TBC</a></p>
            </div>
        </Card>
    );
  };

export default ServiceCard;