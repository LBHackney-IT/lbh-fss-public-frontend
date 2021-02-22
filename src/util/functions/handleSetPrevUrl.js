function handleSetPrevUrl({prevUrl, prevUrlParams}){
    const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic"];
    const currentSearch = window.location.search;
    let paramObj = {};

    if(currentSearch)
    {
        let prevUrlArray = [""];
        let prevUrlParamsArray = [{}];

        // setPrevUrl -- Ignore set postcode page and prevent an indefinite loop.
        if(currentSearch.indexOf('set_postcode') > 0 ||
            (prevUrl.length > 0 && prevUrl[prevUrl.length - 1] == currentSearch))
            return;
        else
        {
            prevUrlArray.push(currentSearch);
            // setPrevUrlParams
            const queryParts = currentSearch.substring(1).split(/[&;]/g);
            const arrayLength = queryParts.length;
            for (let i = 0; i < arrayLength; i++) {
                const queryKeyValue = queryParts[i].split("=");
                if (paramsArray.includes(queryKeyValue[0])) {
                    paramObj[queryKeyValue[0]] = queryKeyValue[1];
                } 
            }

            prevUrlParamsArray.push(paramObj);
            return {prevUrlArray, prevUrlParamsArray};
        }

    }
    return;
}

export { handleSetPrevUrl };
