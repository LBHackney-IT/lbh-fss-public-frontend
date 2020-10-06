import React from 'react';
import { Card } from "../../util/styled-components/Card";

const ServiceCard = ({ service, onClick }) => {
    const storedPostcode = localStorage.getItem("postcode");
    const serviceArray = [service];

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
            {
                serviceArray.map((service, index) => {
                    const locationSorted = service.locations.sort(function (a, b) {
                        return parseFloat(a.distance) - parseFloat(b.distance);
                    });

                    return (
                        (locationSorted[0].distance) !== null ? <p key={index} className="service--distance">Distance: <a className="service--distance--link" href={`https://www.google.com/maps/dir/${storedPostcode}/${locationSorted[0].address1}%20${locationSorted[0].address2}%20${locationSorted[0].city}%20${locationSorted[0].stateProvince}%20${locationSorted[0].postalCode}`} target="_blank">{locationSorted[0].distance}</a></p> : ""
                    )
                })
            }
        </Card>
    );
  };

export default ServiceCard;