import { Injectable } from "@nestjs/common"
import * as fs from "fs"
import * as path from "path"

@Injectable()
export class FileStorageService {
  private readonly dataDir = path.join(process.cwd(), "data")

  constructor() {
    this.ensureDataDirectoryExists()
  }

  private ensureDataDirectoryExists() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
  }

  private getFilePath(filename: string): string {
    return path.join(this.dataDir, `${filename}.json`)
  }

  async readFile<T>(filename: string): Promise<T[]> {
    const filePath = this.getFilePath(filename)

    if (!fs.existsSync(filePath)) {
      await this.writeFile(filename, [])
      return []
    }

    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data) as T[]
  }

  async writeFile<T>(filename: string, data: T[]): Promise<void> {
    const filePath = this.getFilePath(filename)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
  }

  async findById<T extends { id: string }>(filename: string, id: string): Promise<T | undefined> {
    const items = await this.readFile<T>(filename)
    return items.find((item) => item.id === id)
  }

  async findOne<T>(filename: string, query: Partial<T>): Promise<T | undefined> {
    const items = await this.readFile<T>(filename)
    const keys = Object.keys(query)

    return items.find((item) => keys.every((key) => item[key] === query[key]))
  }

  async create<T>(filename: string, data: T): Promise<T> {
    const items = await this.readFile<T>(filename)
    items.push(data)
    await this.writeFile(filename, items)
    return data
  }

  async update<T extends { id: string }>(filename: string, id: string, data: Partial<T>): Promise<T | undefined> {
    const items = await this.readFile<T>(filename)
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) {
      return undefined
    }

    items[index] = { ...items[index], ...data }
    await this.writeFile(filename, items)
    return items[index]
  }

  async delete<T extends { id: string }>(filename: string, id: string): Promise<boolean> {
    const items = await this.readFile<T>(filename)
    const initialLength = items.length
    const filteredItems = items.filter((item) => item.id !== id)

    if (filteredItems.length === initialLength) {
      return false
    }

    await this.writeFile(filename, filteredItems)
    return true
  }
}

