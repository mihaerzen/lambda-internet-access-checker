// Thanks to: https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const getContent = function (url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};

exports.handler = async (event) => {
  console.log('Received event: %j', event);

  const url = event.url || 'https://www.google.com';
  try {
    const content = await getContent(url);
    console.log('Response content: %j', content);
    console.log('You have access to the internet, congratulations!');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You have access!',
        content,
      }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.toString(),
      }),
    };
  }
}
