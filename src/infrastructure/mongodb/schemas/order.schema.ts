import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true }) userId: string;

  @Prop([String]) productIds: string[];

  @Prop({ required: true }) total: number;

  @Prop() status?: "created" | "paid" | "shipped" | "cancelled";
}

export const OrderSchema = SchemaFactory.createForClass(Order);
