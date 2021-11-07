import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import { getModelForClass, plugin, prop } from '@typegoose/typegoose'

@plugin(findorcreate)
export class Bot extends FindOrCreate {
  @prop({ required: true, index: true, unique: true })
  username: string
  @prop({ required: true, index: true, unique: true })
  telegramId: number
  @prop({ required: true, default: false })
  isDown: boolean
  @prop()
  downSince?: Date
  @prop({ required: true, default: new Date() })
  lastChecked: Date
}

const BotModel = getModelForClass(Bot, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreateBot(username: string, telegramId: number) {
  const { doc } = await BotModel.findOrCreate({ username }, { telegramId })
  return doc
}

export function getBots() {
  return BotModel.find({})
}

export function deleteBot(id: Types.ObjectId) {
  return BotModel.findByIdAndDelete(id)
}

export function findBotByUsername(username: string) {
  return BotModel.findOne({ username })
}
