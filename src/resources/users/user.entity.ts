export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: string
  username: string
  email: string
  password: string
  roles: UserRole[]
  createdAt: Date
  updatedAt: Date
}

