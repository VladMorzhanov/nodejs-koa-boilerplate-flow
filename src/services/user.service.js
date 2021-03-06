// @flow

import { Connection } from 'typeorm'
import User from '../entities/user.entity'

export default class UserService {
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  async getUsers(): User {
    return this.dbConnection.manager.getRepository(User).find()
  }

  async getUser(id: number): User {
    return this.dbConnection.manager.getRepository(User).findOne(id)
  }

  async createUser(email: string, password: string): User {
    const user = User.create({ email, password })
    await this.dbConnection.manager.getRepository(User).insert(user)
    return user
  }

  async updateUser(userId: number, userData: User): User {
    await this.dbConnection.manager
      .getRepository(User)
      .update({ id: userId }, userData)

    return this.dbConnection.manager.getRepository(User).findOne(userData)
  }

  async deleteUser(id: number): User {
    await this.dbConnection.manager.getRepository(User).delete(id)
  }
}
