import React, { useEffect } from 'react';

const CookieBannerDisplay = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
          require("lbh-frontend").initAll()
        }
      }, [])
    return (
        <section className="lbh-cookie-banner" data-module="lbh-cookie-banner"  style={{background: "#00664F"}}>
        <div className="lbh-container">
            <div className="govuk-grid-row">
            <div
                className="lbh-cookie-banner__content govuk-grid-column-two-thirds-from-desktop"
            >
                <p>
                We use cookies to ensure you have the best experience. For full
                details see our <a href="https://hackney.gov.uk/privacy">privacy statement</a>.
                </p>
            </div>
            <div
                className="lbh-cookie-banner__button-wrapper govuk-grid-column-one-third-from-desktop"
            >
                <button
                type="button"
                className="govuk-button lbh-cookie-banner__button lbh-button govuk-button--secondary lbh-button--secondary"
                data-module="govuk-button"
                data-behavior="lbh-cookie-close"
                >
                Accept and close
                </button>
            </div>
            </div>
        </div>
        </section>
    )
}

export default CookieBannerDisplay;
