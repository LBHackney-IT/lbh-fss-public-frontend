import React from "react";
import styled from "styled-components";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

const ShareContainer = styled.div`
    button {
        margin: 0 5px;
    }
`;

const Share = (service) => {
    const currentUrl = window.location.href;
    return (
        <ShareContainer>
            <FacebookShareButton
                url={currentUrl}
                quote={service.service.name}
            >
                <FacebookIcon size={50} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={currentUrl}
                title={service.service.name}
            >
                <TwitterIcon size={50} round />
            </TwitterShareButton>
            <LinkedinShareButton
                url={currentUrl}
            >
                <LinkedinIcon size={50} round />
            </LinkedinShareButton>
            <WhatsappShareButton
                url={currentUrl}
                title={service.service.name}
            >
                <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <EmailShareButton
                url={currentUrl}
                subject={service.service.name}
                body=""
            >
                <EmailIcon size={50} round />
            </EmailShareButton>
        </ShareContainer>
    )
}

export default Share;