import { Role } from "@prisma/client"

export const checkIsAdmin = (role: Role) => {
    return role === 'ADMIN' || role === 'SUPER_ADMIN'
}

