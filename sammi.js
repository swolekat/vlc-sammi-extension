function vlcMain() {
    const password = 'test';
    const headers = {
        "Authorization": `Basic ${btoa(`:${password}`)}`,
        "Content-Type": "application/json"
    };


    SAMMI.httpRequest("http://localhost:8080/requests/status.json", "GET", headers).then(response => {
        const data = JSON.parse(response.Value);
        const realData = JSON.parse(data.response);
        console.log(data)
    });
}