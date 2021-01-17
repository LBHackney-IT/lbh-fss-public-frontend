function handleSetPrevUrl({prevUrl, prevUrlParams}){
    const paramsArray = ["category_explorer", "postcode", "service_search", "support_service", "categories", "demographic"];
    const currentSearch = window.location.search;
    let paramObj = {};

    if (prevUrl.length == 0 && prevUrlParams.length == 0) {
        let prevUrlArray = [""];
        let prevUrlParamsArray = [{}];

        // setPrevUrl
        if (currentSearch) {
            prevUrlArray.push(currentSearch);
        }

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

    return;
}

export { handleSetPrevUrl };