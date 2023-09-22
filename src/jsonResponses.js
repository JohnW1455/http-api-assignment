const respondJSON = (request, response, status, object, contentType) => {
  const headers = {
    'Content-Type': contentType,
  };

  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respondJSON(request, response, 404, xmlResponse, acceptedTypes);
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 404, responseString, 'application/json');
};

const getSuccess = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  console.log(acceptedTypes);

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = '<response><message>This is a successful response</message></response>';
    return respondJSON(request, response, 200, xmlResponse, acceptedTypes);
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, responseString, 'application/json');
};

const getBadRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    if (!params.valid || params.valid !== 'true') {
      // This is a bad request
      const xmlResponse = '<response><message>Missing valid query param set to true</message><id>badRequest</id></response>';
      return respondJSON(request, response, 400, xmlResponse, acceptedTypes);
    }
    const xmlResponse = '<response><message>This request has the required parameters</message></response>';
    return respondJSON(request, response, 200, xmlResponse, acceptedTypes);
  }

  if (!params.valid || params.valid !== 'true') {
    // This is a bad request
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequest';
    const responseString = JSON.stringify(responseJSON);
    return respondJSON(request, response, 400, responseString, 'application/json');
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, responseString, 'application/json');
};

const getUnauth = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      const xmlResponse = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
      return respondJSON(request, response, 401, xmlResponse, acceptedTypes);
    }
    const xmlResponse = '<response><message>You have successfully viewed the content</message></response>';
    return respondJSON(request, response, 200, xmlResponse, acceptedTypes);
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // This is a bad request
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    const responseString = JSON.stringify(responseJSON);
    return respondJSON(request, response, 401, responseString, 'application/json');
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, responseString, 'application/json');
};

const getForbid = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You have not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = '<response><message>You have not have access to this content</message><id>forbidden</id></response>';
    return respondJSON(request, response, 403, xmlResponse, acceptedTypes);
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 403, responseString, 'application/json');
};

const getInternalErr = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something Went Wrong',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = '<response><message>Internal Server Error. Something Went Wrong</message><id>internalError</id></response>';
    return respondJSON(request, response, 500, xmlResponse, acceptedTypes);
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 500, responseString, 'application/json');
};

const getNotImplement = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const xmlResponse = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content</message><id>notImplemented</id></response>';
    return respondJSON(request, response, 501, xmlResponse, acceptedTypes);
  }

  const responseString = JSON.stringify(responseJSON);
  return respondJSON(request, response, 501, responseString, 'application/json');
};

module.exports = {
  notFound,
  getSuccess,
  getBadRequest,
  getUnauth,
  getForbid,
  getInternalErr,
  getNotImplement,
};
