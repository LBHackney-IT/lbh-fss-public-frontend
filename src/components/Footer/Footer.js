import React from "react";
import styled from "styled-components";
import breakpoint from 'styled-components-breakpoint';

const FooterDiv = styled.footer`
    padding: 40px 15px;
    ${breakpoint('md')`
        padding: 40px 0;
    `}

    div {
        ${breakpoint('sm')`
            width: 100%;
        `}
        ${breakpoint('md')`
            width: 75%;
        `}
    }
    h3 {
        font-size: 27px;
    }
    h4 {
        font-size: 24px;
    }
    h3, h4 {
        margin-bottom: 20px;
    }
    hr {
        margin-top: 50px;
    }
`;

const Footer = () => {
    return (
        <FooterDiv>
            <div>
                <h3>Do you need digital support?</h3>
                <p>If you need help using the Internet for any of the services listed then you may find <a href="#LINK" target="_blank">our Digital skills page</a> useful.</p>
            </div>
            <hr></hr>
            <div>
                <h4>Information for Voluntary and Community Orginsations</h4>
                <p>IThis service displays voluntary and community organisations offering help to Hackney’s diverse community, especially to those who are affected by coronavirus.</p>
                <ul>
                    <li><a href="#LINK" target="_blank">Register your service to be listed</a></li>
                    <li><a href="#LINK" target="_blank">See if you are eligible for a grant</a></li>
                    <li><a href="#LINK" target="_blank">Support to improve your online presence</a></li>
                    <li><a href="#LINK" target="_blank">Log In to your account</a></li>
                </ul>
            </div>
        </FooterDiv>
    );
}

export default Footer;