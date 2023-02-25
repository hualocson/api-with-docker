/* Format for response
1. Success:
{
    "success": true,
    "data": {
        //Some data for success
    }
    message: "This is message for success response"
}
2. Failure
{
    "success": false,
    "data": {},
    "message": "This is error",
    "error_code": 404
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
                data: {},
                message: 'Server get error!',
                errorCode: 500,
            })
            break
    }
}

const badRequest = (res, message) =>
    responseWithData(res, 400, {
        success: false,
        data: {},
        message: message,
        errorCode: 400,
    })

const notFound = (res, message) =>
    responseWithData(res, 404, {
        success: false,
        data: {},
        message: message,
        errorCode: 404,
    })

const ok = (res, data) =>
    responseWithData(res, 200, {
        success: true,
        data,
        message: 'Request successful!',
    })

const created = (res, data) =>
    responseWithData(res, 201, {
        success: true,
        data,
        message: 'Create successful!',
    })

export default {
    error,
    badRequest,
    created,
    notFound,
    ok,
}
