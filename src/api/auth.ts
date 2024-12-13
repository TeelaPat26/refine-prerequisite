export function authenticate() {    
    return Promise.resolve({
        status: 200,
        data: {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        }
    })
}

export function getCurrentUser() {
    return Promise.resolve({
        status: 200,
        data: {
            userId: 'userId',
            username: 'username',
            role: 'role',
        }
    })
}
