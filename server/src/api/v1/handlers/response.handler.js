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
                status: 500,
                message: error,
            })
            break
    }
}

const badRequest = (res, message) =>
    responseWithData(res, 400, {
        status: 400,
        message,
    })
const notFound = (res, message) =>
    responseWithData(res, 404, {
        status: 404,
        message,
    })

const ok = (res, data) =>
    responseWithData(res, 200, {
        status: 200,
        data,
    })

const created = (res, data) => responseWithData(res, 201, data)

export default {
    error,
    badRequest,
    created,
    notFound,
    ok,
}
