async function proxyOnResponse (err, res, request, h, settings, ttl) {
    console.log('receiving the response from the upstream.');
   // const payload = await Wreck.read(res, { json: true });

   // console.log('some payload manipulation if you want to.');
    const response = h.response(res.payload);
    response.headers = res.headers;
    return response;
}
export default proxyOnResponse;