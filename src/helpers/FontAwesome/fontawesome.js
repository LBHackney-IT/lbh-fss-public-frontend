import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faMapMarkerAlt,
    faMapMarker,
    faHome,
    faPhone,
    faEnvelope,
    faExternalLinkSquareAlt,
    faShareSquare,
    faPrint,
    faArrowLeft,
    faSearch,
    faChevronDown,
    faFilter,
    faBars,    
    faPoundSign,
    faHandHoldingHeart,
    faAppleAlt,
    faPlus,
    faInfo,
    faMinus,    
    faComments,
    faWalking,
    faHeartbeat,
    faPalette,
    faSuitcase,
    faHouse,
    faHeadSideBrain
} from '@fortawesome/pro-solid-svg-icons';

import {
    faFacebookSquare,
    faTwitterSquare,
    faInstagramSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import {
    faMapMarkerAlt as faMapMarkerAltDuotone,
} from '@fortawesome/pro-duotone-svg-icons';

library.add(
    faHeadSideBrain,
    faPalette,  
    faWalking,
    faHouse,
    faAppleAlt,    
    faComments,
    faPlus,
    faMinus,
    faSuitcase,
    faHandHoldingHeart,
    faPoundSign,
    faHeartbeat,
    faFilter,
    faInfo,
    faBars,
    faMapMarkerAlt,
    faMapMarker,
    faHome,
    faPhone,
    faEnvelope,
    faExternalLinkSquareAlt,
    faMapMarkerAltDuotone,
    faShareSquare,
    faSearch,
    faPrint,
    faArrowLeft,
    faFacebookSquare,
    faTwitterSquare,
    faInstagramSquare,
    faLinkedin,
    faChevronDown,
);

export const categoryIconMap = {
    "loneliness-or-isolation":  ["fas", "comments"],
    "anxiety-or-mental-health": ["fas", "head-side-brain"],
    "safe-and-healthy-body":    ["fas", "heartbeat"],
    "exercise-and-wellbeing":   ["fas", "walking"],
    "arts-and-creativity":      ["fas", "palette"],
    "food-or-shopping":         ["fas", "apple-alt"],
    "faith-led-activities":     ["fas", "hand-holding-heart"],
    "money-advice":             ["fas", "pound-sign"],
    "employment-advice":        ["fas", "suitcase"],
    "housing-advice":           ["fas", "house"],
    "immigration-advice":       ["fas", "info"],
};