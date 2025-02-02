const httpStatus = (status: string) => {
  switch (status) {
    case 'SUCESSFULL': return 200;
    case 'CREATED': return 201;
    case 'NO_CONTENT': return 204;
    case 'BAD_REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'INVALID_VALUE': return 422;
    default: return 500;
  }
};

export default httpStatus;
