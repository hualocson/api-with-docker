/* Format for response
{
    "success": true or false,
    "data": {}
    "message": "This is message for response",
    "statusCode": 200 or 404 or 500,
}
1. Success:
{
    "success": true,
    "data": {
        //Some data for success
    },
    message: "This is message for success response",
    "statusCode": 200 or 201
}
2. Failure
{
    "success": false,
    "data": {},
    "message": "This is error",
    "statusCode": 404 or 500
}
*/

const responseWithData = (res, statusCode, data) =>
    res.status(statusCode).json(data)

const error = (res, error) => {
    switch (error.status) {
        case 404:
            notFound(res, error.message)
            break
        case 400:
            badRequest(res, error.message)
            break
        default:
            responseWithData(res, 500, {
                success: false,
                data: error.message,
                message: 'Server get error!',
                statusCode: 500,
            })
            break
    }
}

const badRequest = (res, message) =>
    responseWithData(res, 400, {
        success: false,
        data: {},
        message: message,
        statusCode: 400,
    })

const notFound = (res, message) =>
    responseWithData(res, 404, {
        success: false,
        data: {},
        message: message,
        statusCode: 404,
    })

const ok = (res, data) =>
    responseWithData(res, 200, {
        success: true,
        data,
        message: 'Request successful!',
        statusCode: 200,
    })

const created = (res, data) =>
    responseWithData(res, 201, {
        success: true,
        data,
        message: 'Create successful!',
        statusCode: 201,
    })

export default {
    error,
    badRequest,
    created,
    notFound,
    ok,
}
