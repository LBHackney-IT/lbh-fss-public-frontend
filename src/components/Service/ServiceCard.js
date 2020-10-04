import React from 'react';
import { Card } from "../../util/styled-components/Card";

const ServiceCard = ({ service, onClick }) => {
    const storedPostcode = localStorage.getItem("postcode");

    let hero = "";
    if (service.images && service.images.medium.length) {
        hero = service.images.medium;
    }

    const select = e => {
        onClick(service.id);
    }

    return (
        <Card modifiers="serviceCard" id={service.id} className="fss--card">
            <div onClick={select}>
                {hero.length ? (
                    <div className="image-container">
                        <img src={hero} alt={service.name} />
                    </div>
                ) : ""}
                <div className="fss--card--container">
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                </div>
            </div>
            {(service.locations[0].distance) !== null ? <p className="service--distance">Distance: <a className="service--distance--link" href={`https://www.google.com/maps/dir/${storedPostcode}/${service.locations[0].address1}%20${service.locations[0].address2}%20${service.locations[0].city}%20${service.locations[0].stateProvince}%20${service.locations[0].postalCode}`} target="_blank">{service.locations[0].distance}</a></p> : ""}
        </Card>
    );
  };

export default ServiceCard;