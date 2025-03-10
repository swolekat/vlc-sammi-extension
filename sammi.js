function vlcMain() {
    const VARIABLE_BUTTON_ID = 'vlcVariables';
    let headers;
    let currentStatus;

    const startPollLoop = () => {
        setInterval(() => {
            SAMMI.httpRequest("http://localhost:8080/requests/status.json", "GET", headers).then(response => {
                const data = JSON.parse(response.Value);
                const newStatus = JSON.parse(data.response);
                // handle first loop
                if(!currentStatus){
                    currentStatus = newStatus;
                    SAMMI.setVariable('time', newStatus.time, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('title', title, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('artist', artist, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('filename', filename, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('length', newStatus.length, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('state', newStatus.state, VARIABLE_BUTTON_ID)
                    return;
                }
                SAMMI.setVariable('time', newStatus.time, VARIABLE_BUTTON_ID)
                if(JSON.stringify(newStatus?.information?.category?.meta) !== JSON.stringify(currentStatus?.information?.category?.meta)){
                    const {artist, title, filename} = newStatus.information.category.meta;
                    SAMMI.setVariable('title', title, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('artist', artist, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('filename', filename, VARIABLE_BUTTON_ID)
                    SAMMI.setVariable('length', newStatus.length, VARIABLE_BUTTON_ID);
                    SAMMI.triggerExt('VLC Song Changed', newStatus.information.category.meta);
                }
                if(currentStatus.state !== newStatus.state){
                    SAMMI.setVariable('state', newStatus.state, VARIABLE_BUTTON_ID)
                    SAMMI.triggerExt('VLC State Changed', {state: newStatus.state});
                }
                SAMMI.triggerExt('VLC Status Updated', {status: newStatus});
                currentStatus = newStatus;
            });
        }, 1000);
    };

    const tryToGetPassword = () => {
        SAMMI.getVariable('password', VARIABLE_BUTTON_ID).then((data) => {
            if(!data?.Value){
                SAMMI.alert('VLC Plugin: Could NOT get password from VLC Variables button. Please set it.');
                setTimeout(tryToGetPassword, 30000);
            }
            const password = data.Value;
            headers = {
                "Authorization": `Basic ${btoa(`:${password}`)}`,
                "Content-Type": "application/json"
            };
            SAMMI.alert('VLC Plugin: Connected.');
            startPollLoop();
        }).catch(() => {
            SAMMI.alert('VLC Plugin: Could NOT get password from VLC Variables button. Please set it.');
            setTimeout(tryToGetPassword, 30000);
        });
    };

    sammiclient.on('VLC Play', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_forceresume", "GET", headers)
    });

    sammiclient.on('VLC Pause', () => {

        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_forcepause", "GET", headers)
    });

    sammiclient.on('VLC Toggle Pause', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_pause", "GET", headers);
    });

    sammiclient.on('VLC Stop', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_stop", "GET", headers)
    });

    sammiclient.on('VLC Next', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_next", "GET", headers)
    });

    sammiclient.on('VLC Previous', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_previous", "GET", headers)
    });

    sammiclient.on('VLC Toggle Random', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_random", "GET", headers)
    });

    sammiclient.on('VLC Toogle Loop', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_loop", "GET", headers)
    });

    sammiclient.on('VLC Toggle Repeat', () => {
        SAMMI.httpRequest("http://localhost:8080/requests/status.json?command=pl_random", "GET", headers)
    });

    sammiclient.on('VLC Play File', (payload) => {
        const filePath = payload?.Data?.filePath;
        SAMMI.httpRequest(`http://localhost:8080/requests/status.json?command=in_play&input=${encodeURIComponent(filePath)}`, "GET", headers)
    });

    tryToGetPassword();
}