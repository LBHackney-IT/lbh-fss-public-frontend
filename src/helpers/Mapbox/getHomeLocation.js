const getHomeLocation = data => {
    if (data.data.metadata !== undefined) {
        if (data.data.metadata.postCodeLatitude !== null && data.data.metadata.postCodeLongitude !== null) {
            let homeLocation = [data.data.metadata];
            return homeLocation;
        }
    }
    return [];
}
  
export default getHomeLocation;