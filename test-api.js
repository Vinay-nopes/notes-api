const http = require('http');

const makeRequest = (method, path, data = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: body ? JSON.parse(body) : {}
                });
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTests = async () => {
    try {
        console.log('--- TEST 1: GET All Notes ---');
        console.log(await makeRequest('GET', '/api/notes'));

        console.log('\n--- TEST 2: POST New Note ---');
        const newNote = await makeRequest('POST', '/api/notes', {
            title: 'Test Note',
            content: 'Content derived from test script'
        });
        console.log(newNote);
        const newId = newNote.body.data.id;

        console.log(`\n--- TEST 3: GET Note ${newId} ---`);
        console.log(await makeRequest('GET', `/api/notes/${newId}`));

        console.log(`\n--- TEST 4: PUT Update Note ${newId} ---`);
        console.log(await makeRequest('PUT', `/api/notes/${newId}`, {
            title: 'Updated Title',
            content: 'Updated Content'
        }));

        console.log(`\n--- TEST 5: DELETE Note ${newId} ---`);
        console.log(await makeRequest('DELETE', `/api/notes/${newId}`));

        console.log('\n--- TEST 6: Validation (Empty Title) ---');
        console.log(await makeRequest('POST', '/api/notes', {
            title: '',
            content: 'Should fail'
        }));

    } catch (error) {
        console.error('Test failed:', error);
    }
};

runTests();
